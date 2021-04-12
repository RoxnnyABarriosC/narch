import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UpdateITemPayload from "../../InterfaceAdapters/Payloads/UpdateITem.payload";

export default class UpdateItemUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IItemRepository<IItemDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateITemPayload): Promise<any>
    {
        /*this.authService.validatePermissions(payload.getPermissions());

        const role: IItemDomain = await this.repository.getOne(payload.getId());

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);*/
    }
}

