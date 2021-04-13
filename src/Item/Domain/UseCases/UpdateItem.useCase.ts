import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UpdateITemPayload from "../../InterfaceAdapters/Payloads/UpdateITem.payload";

export default class UpdateItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateITemPayload): Promise<IItemDomain>
    {
        const item: IItemDomain = await this.repository.getOne(payload.getId());

        item.name = payload.getName();
        item.updatedBy = payload.getAuthUser();

        return await this.repository.save(item);
    }
}

