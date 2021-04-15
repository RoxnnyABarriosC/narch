import lazyInject from "../../../../LazyInject";
import {REPOSITORIES} from "../../../../Repositories";
import IUserRepository from "../../../InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../InterfaceAdapters/IUser.domain";
import {SERVICES} from "../../../../Services";
import IAuthService from "../../../../App/InterfaceAdapters/IServices/IAuth.service";
import IEncryption from "../../../../App/InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../../App/Infrastructure/Factories/Encryption.factory";
import SaveUserPayload from "../../../InterfaceAdapters/Payloads/SaveUser.payload";
import UserEntity from "../../User.entity";

export default class SaveUserCommandUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private encryption: IEncryption;

    constructor()
    {
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

        return await this.repository.save(user);
    }
}
