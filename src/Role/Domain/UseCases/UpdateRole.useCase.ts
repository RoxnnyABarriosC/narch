import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";
import SaveLogRoleUseCase from "../../../Log/Domain/UseCases/SaveLogRole.useCase";
import _ from "lodash";

export default class UpdateRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateRolePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const role: IRoleDomain = await this.repository.getOne(payload.getId());
        const oldRole: IRoleDomain = _.clone<IRoleDomain>(role);

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        const log = new SaveLogRoleUseCase(payload.getAuthUser(), oldRole);
        await log.handle(LogActionEnum.UPDATE);

        return await this.repository.save(role);
    }
}

