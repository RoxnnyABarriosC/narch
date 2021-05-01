import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";
import _ from "lodash";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import RoleEntity from "../Role.entity";
import RoleLogTransformer from "../../Presentation/Transformers/RoleLog.transformer";

export default class UpdateRoleUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateRolePayload): Promise<IRoleDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        this.authService.validatePermissions(payload.getPermissions());

        let role: IRoleDomain = await this.repository.getOne(payload.getId());
        const oldRole: IRoleDomain = _.cloneDeep<IRoleDomain>(role);

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        role = await this.repository.save(role);

        const logUpdateProps: ILogUpdateProps = {
            type: RoleEntity.name,
            entity: RoleEntity.name,
            entityId: role.getId(),
            newEntity: role,
            oldEntity: oldRole,
            transformer: new RoleLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps)

        return role;
    }
}

