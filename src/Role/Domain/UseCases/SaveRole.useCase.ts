import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";
import RoleEntity from "../Role.entity";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";
import SaveLogRoleUseCase from "../../../Log/Domain/UseCases/SaveLogRole.useCase";

export default class SaveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: SaveRolePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const role = new RoleEntity();

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        const log = new SaveLogRoleUseCase(payload.getAuthUser(), role);
        await log.handle(LogActionEnum.SAVE);

        return await this.repository.save(role);
    }
}
