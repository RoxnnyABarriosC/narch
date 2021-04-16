import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuth.service";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import SaveUserPayload from "../../InterfaceAdapters/Payloads/SaveUser.payload";
import UserEntity from "../User.entity";
import EventHandler from "../../../App/Infrastructure/Events/EventHandler";
import UserCreatedEvent from "../../Infrastructure/Event/UserCreated.event";
import IFileRepository from "../../../File/InterfaceAdapters/IFile.repository";
import IFileDomain from "../../../File/InterfaceAdapters/IFile.domain";
import UseCaseHelpers from "../../../App/Infrastructure/Helpers/UseCaseHelpers";

export default class SaveUserUseCase extends UseCaseHelpers
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IFileRepository)
    private fileRepository: IFileRepository<IFileDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private encryption: IEncryption;

    constructor()
    {
        super();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: SaveUserPayload): Promise<IUserDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        let user: IUserDomain = new UserEntity();

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();
        user.password = await this.encryption.encrypt(payload.getPassword());
        user.enable = payload.getEnable();
        user.permissions = payload.getPermissions();
        user.roles = payload.getRoles();
        user.isSuperAdmin = payload.getIsSuperAdmin();

        user.mainPicture = await this.updateOrCreateRelationshipById<IUserDomain,IFileDomain>(user,'mainPicture', payload.getMainPictureId(),'fileRepository');

        user = await this.repository.save(user);

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, {email: user.email});

        return user;
    }
}
