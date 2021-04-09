import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";

export default class UpdateRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateRolePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const role: IRoleDomain = await this.repository.getOne(payload.getId());

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

