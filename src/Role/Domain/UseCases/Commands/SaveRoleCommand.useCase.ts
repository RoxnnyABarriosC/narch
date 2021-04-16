import lazyInject from "../../../../LazyInject";
import IRoleRepository from "../../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../../App/InterfaceAdapters/IServices/IAuth.service";
import {REPOSITORIES} from "../../../../Repositories";
import {SERVICES} from "../../../../Services";
import IRoleDomain from "../../../InterfaceAdapters/IRole.domain";
import RoleEntity from "../../Role.entity";
import SaveRoleCommandPayload from "../../../InterfaceAdapters/Payloads/Commands/SaveRoleCommand.payload";

export default class SaveRoleCommandUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: SaveRoleCommandPayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const role = new RoleEntity();

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}
