import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";
import RoleEntity from "../Role.entity";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import {ILogSaveProps} from "../../../App/Infrastructure/Logger/Logger";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";

export default class SaveRoleUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: SaveRolePayload): Promise<IRoleDomain>
    {
        const authUser: IUserDomain =payload.getAuthUser();

        this.authService.validatePermissions(payload.getPermissions());

        let role: IRoleDomain = new RoleEntity();

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        role = await this.repository.save(role);

        const logSaveProps: ILogSaveProps = {
            type: RoleEntity.name,
            entity: RoleEntity.name,
            entityId: role.getId(),
            authUser,
        }

        this.logSave(logSaveProps);

        return role;
    }
}
