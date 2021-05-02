import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import UpdateMePayload from "../../InterfaceAdapters/Payloads/UpdateMe.payload";
import IFileRepository from "../../../File/InterfaceAdapters/IFile.repository";
import IFileDomain from "../../../File/InterfaceAdapters/IFile.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import _ from "lodash";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../../../User/Domain/User.entity";
import UserLogTransformer from "../../../User/Presentation/Transformers/UserLog.transformer";

export default class UpdateMeUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IFileRepository)
    private fileRepository: IFileRepository<IFileDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private tokenFactory: TokenFactory;

    constructor()
    {
        super();
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: UpdateMePayload): Promise<IToken>
    {
        let authUser: IUserDomain = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        const oldAuthUser: IUserDomain = _.cloneDeep<IUserDomain>(authUser);

        authUser.firstName = payload.getFirstName();
        authUser.lastName = payload.getLastName();
        authUser.email = payload.getEmail();

        authUser.mainPicture =  await this.updateOrCreateRelationshipById<IUserDomain,IFileDomain>(authUser,'mainPicture', payload.getMainPictureId(),'fileRepository');

        authUser = await this.repository.update(authUser);

        await this.authService.addTokenBackList(tokenId)

        const logUpdateProps: ILogUpdateProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: authUser.getId(),
            newEntity: authUser,
            oldEntity: oldAuthUser,
            description: 'you changed your data',
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return this.tokenFactory.createToken(authUser);
    }
}
