import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import UpdateRolePayload from "../../InterfaceAdapters/Payloads/UpdateRole.payload";

export default class UpdateRoleUseCase
{
    private repository: IRoleRepository;
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

    async handle(payload: UpdateRolePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const id = payload.getId();
        let role: IRoleDomain = await this.repository.getOne(id);

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

