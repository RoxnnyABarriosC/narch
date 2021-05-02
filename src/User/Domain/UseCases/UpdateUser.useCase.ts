import lazyInject from "../../../LazyInject";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IAuthService from "../../InterfaceAdapters/IAuth.service";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import UpdateUserPayload from "../../InterfaceAdapters/Payloads/UpdateUser.payload";
import CheckUserRolePayload from "../../InterfaceAdapters/Payloads/CheckUserRole.payload";
import Roles from "../../../Config/Roles";
import CantDisabledException from "../../../Auth/Domain/Exceptions/CantDisabled.exception";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import _ from "lodash";
import IUserService from "../../InterfaceAdapters/IUser.service";
import IFileRepository from "../../../File/InterfaceAdapters/IFile.repository";
import IFileDomain from "../../../File/InterfaceAdapters/IFile.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../User.entity";
import UserLogTransformer from "../../Presentation/Transformers/UserLog.transformer";

export default class UpdateUserUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    @lazyInject(REPOSITORIES.IFileRepository)
    private fileRepository: IFileRepository<IFileDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    @lazyInject(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: UpdateUserPayload): Promise<IUserDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        await this.isSuperAdmin(user,enable);

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.enable = payload.getEnable();
        user.email = payload.getEmail();
        user.permissions = payload.getPermissions();
        user.mainPicture =  await this.updateOrCreateRelationshipById<IUserDomain,IFileDomain>(user,'mainPicture', payload.getMainPictureId(),'fileRepository');

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        user = await this.repository.save(user);

        const logUpdateProps: ILogUpdateProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            newEntity: user,
            oldEntity: oldUser,
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return user;
    }

    private async isSuperAdmin(user: IUserDomain, enable: boolean): Promise<void>
    {
        if(!_.isUndefined(user?.roles) && !_.isNull(enable))
        {
            let checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            }

            const verifyRole = await this.userService.checkIfUserHasRole(checkRole);

            if(verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }
    }
}
