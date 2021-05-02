import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IAuthService from "../../InterfaceAdapters/IAuth.service";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import SaveUserPayload from "../../InterfaceAdapters/Payloads/SaveUser.payload";
import UserEntity from "../User.entity";
import UserCreatedEvent from "../../Infrastructure/Event/UserCreated.event";
import IFileRepository from "../../../File/InterfaceAdapters/IFile.repository";
import IFileDomain from "../../../File/InterfaceAdapters/IFile.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import {ILogSaveProps} from "../../../App/Infrastructure/Logger/Logger";

export default class SaveUserUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

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
        const authUser: IUserDomain = payload.getAuthUser();

        this.authService.validatePermissions(payload.getPermissions());

        let user: IUserDomain = new UserEntity();

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();
        user.password = await this.encryption.encrypt(payload.getPassword());
        user.enable = payload.getEnable();
        user.permissions = payload.getPermissions();
        user.isSuperAdmin = payload.getIsSuperAdmin();

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        user.mainPicture = await this.updateOrCreateRelationshipById<IUserDomain,IFileDomain>(user,'mainPicture', payload.getMainPictureId(),'fileRepository');

        user = await this.repository.save(user);

        this.eventExecute(UserCreatedEvent.USER_CREATED_EVENT,{email: user.email});

        const logSaveProps: ILogSaveProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            authUser,
        }

        this.logSave(logSaveProps);

        return user;
    }
}
