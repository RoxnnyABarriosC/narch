import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import ChangeMyPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeMyPassword.payload";
import PasswordWrongException from "../Exceptions/PasswordWrong.exception";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import {SERVICES} from "../../../Services";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuth.service";

export default class ChangeMyPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private encryption: IEncryption;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IToken>
    {
        let user = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        if(! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        user = await this.repository.save(user);

        await this.authService.addTokenBackList(tokenId);

        return this.tokenFactory.createToken(user);
    }
}
