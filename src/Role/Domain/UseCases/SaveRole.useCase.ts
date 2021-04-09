import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";
import RoleEntity from "../Role.entity";

export default class SaveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

    async handle(payload: SaveRolePayload): Promise<IRoleDomain>
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
