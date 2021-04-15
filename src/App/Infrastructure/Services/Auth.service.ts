import {injectable} from "inversify";
import jwt, { TAlgorithm } from "jwt-simple";
import _ from "lodash";
import Config from "config";

import EncryptionFactory from "../Factories/Encryption.factory";
import IAuthService from "../../InterfaceAdapters/IServices/IAuth.service";
import WrongPermissionsException from "../Exceptions/WrongPermissions.exception";
import {IEncryption, ITokenRepository} from "@digichanges/shared-experience";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import Permissions from "../../../Config/Permissions";
import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import SetTokenBlacklistUseCase from "../../Domain/UseCases/Tokens/SetTokenBlacklist.useCase";

@injectable()
export default class AuthService implements IAuthService
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public decodeToken (token: string): any // TODO: Add type
    {
        let TokenArray = token.split(" ");

        let secret: string = Config.get('jwt.secret');
        const algorithm: TAlgorithm = Config.get('encryption.bcrypt.algorithm');

        return jwt.decode(TokenArray[1], secret, false, algorithm);
    }

    public getPermissions(user: IUserDomain): string[]
    {
        let permissions: string[] = user.permissions;
        const roles: IRoleDomain[] = user.getRoles();

        _.map(roles, (role) => {
            if ( role.permissions && role.enable ) _.map(role.permissions, (rolePermission: string) => permissions.push(rolePermission));
        });

        return [...new Set(permissions)];
    }

    public validatePermissions(permissions: string[]): void
    {
        if (!_.isEmpty(permissions) && _.isEmpty(_.intersection(permissions, Permissions.permissions())))
        {
            throw new WrongPermissionsException();
        }
    }

    public async addTokenBackList(tokenId: string): Promise<void>
    {
        const token: any = await this.tokenRepository.getOne(tokenId);

        const setTokenBlacklistUseCase = new SetTokenBlacklistUseCase();
        await setTokenBlacklistUseCase.handle(token);
    }
}
