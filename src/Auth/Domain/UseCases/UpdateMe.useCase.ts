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
import UseCaseHelpers from "../../../App/Infrastructure/Helpers/UseCaseHelpers";
import _ from "lodash";
import SaveLogUserUseCase from "../../../Log/Domain/UseCases/SaveLogUser.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class UpdateMeUseCase extends UseCaseHelpers
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
        let user: IUserDomain = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();

        user.mainPicture =  await this.updateOrCreateRelationshipById<IUserDomain,IFileDomain>(user,'mainPicture', payload.getMainPictureId(),'fileRepository');

        user = await this.repository.save(user);

        await this.authService.addTokenBackList(tokenId)

        const log = new SaveLogUserUseCase(payload.getAuthUser(), oldUser);
        await log.handle(LogActionEnum.UPDATE);

        return this.tokenFactory.createToken(user);
    }
}
