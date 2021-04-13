import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import SaveItemPayload from "../../InterfaceAdapters/Payloads/SaveItem.payload";
import ItemEntity from "../Item.entity";

export default class SaveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: SaveItemPayload): Promise<IItemDomain>
    {
        let item: IItemDomain = new ItemEntity();

        if (payload.getId())
        {
            item.setId(payload.getId());
        }

        item.name = payload.getName();
        item.createdBy = payload.getAuthUser();
        item.updatedBy = payload.getAuthUser();

        return await this.repository.save(item);
    }
}
