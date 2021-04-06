import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import SaveUserPayload from "../../InterfaceAdapters/Payloads/SaveUser.payload";
import UserEntity from "../User.entity";
import EventHandler from "../../../App/Infrastructure/Events/EventHandler";
import UserCreatedEvent from "../../Infrastructure/Event/UserCreated.event";

export default class SaveUserUseCase
{
    private repository: IUserRepository;
    private authService: IAuthService;
    private encryption: IEncryption;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
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
        user.confirmationToken = payload.getConfirmationToken();
        user.passwordRequestedAt = payload.getPasswordRequestedAt();
        user.permissions = payload.getPermissions();
        user.roles = payload.getRoles();
        user.isSuperAdmin = payload.getIsSuperAdmin();

        user = await this.repository.save(user);

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, {email: user.email});

        return user;
    }
}
