import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import AuthPayload from "../../InterfaceAdapters/Payloads/Auth.payload";
import UserDisabledException from "../../../User/Domain/Exceptions/UserDisabled.exception";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import RoleDisabledException from "../../../Role/Domain/Exceptions/RoleDisabled.exception";
import BadCredentialsException from "../Exceptions/BadCredentials.exception";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";

export default class LoginUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    private encryption: IEncryption;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: AuthPayload): Promise<IToken>
    {
        const email = payload.getEmail();
        const password = payload.getPassword();
        const user: IUserDomain =  await this.repository.getOneBy({email});

        if(user.enable === false)
        {
            throw new UserDisabledException();
        }

        const roleSystem = user.getRoles().some(role => role.ofSystem && role.enable === false);

        if (roleSystem)
        {
            throw new RoleDisabledException();
        }

        // TODO: Si tiene otros roles (NO DEL SISTEMA) y estan inabilitados mandar una notificacion WS con los roles inabilitados.


        if (! await this.encryption.compare(password, user.password))
        {
            throw new BadCredentialsException();
        }

        return this.tokenFactory.createToken(user);
    }
}
