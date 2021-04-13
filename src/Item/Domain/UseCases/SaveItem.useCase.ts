import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import SaveItemPayload from "../../InterfaceAdapters/Payloads/SaveItem.payload";
import ItemEntity from "../Item.entity";
import SaveLogItemUseCase from "../../../Log/Domain/UseCases/SaveLogItem.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class SaveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

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

        item = await this.repository.save(item);

        const log = new SaveLogItemUseCase(payload.getAuthUser(),item);
        await log.handle(LogActionEnum.SAVE);

        return item;
    }
}
