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
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import _ from "lodash";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../../../User/Domain/User.entity";
import UserLogTransformer from "../../../User/Presentation/Transformers/UserLog.transformer";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class ChangeMyPasswordUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private encryption: IEncryption;

    private tokenFactory: TokenFactory;

    constructor()
    {
        super()
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IToken>
    {
        let authUser = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        const oldAuthUser: IUserDomain = _.cloneDeep<IUserDomain>(authUser);

        if(! await this.encryption.compare(payload.getCurrentPassword(), authUser.password))
        {
            throw new PasswordWrongException();
        }

        authUser.password = await this.encryption.encrypt(payload.getNewPassword());

        authUser = await this.repository.save(authUser);

        await this.authService.addTokenBackList(tokenId);

        const logUpdateProps: ILogUpdateProps<UserEntity> = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: authUser.getId(),
            newEntity: authUser,
            oldEntity: oldAuthUser,
            description: 'you changed your password',
            ignore: ['password'],
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return this.tokenFactory.createToken(authUser);
    }
}
