import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import SaveItemPayload from "../../InterfaceAdapters/Payloads/SaveItem.payload";
import ItemEntity from "../Item.entity";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import {ILogSaveProps} from "../../../App/Infrastructure/Logger/Logger";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class SaveItemUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: SaveItemPayload): Promise<IItemDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        let item: IItemDomain = new ItemEntity();

        if (payload.getId())
        {
            item.setId(payload.getId());
        }

        item.name = payload.getName();
        item.createdBy = payload.getAuthUser();
        item.updatedBy = payload.getAuthUser();

        item = await this.repository.save(item);

        const logSaveProps: ILogSaveProps = {
            type: ItemEntity.name,
            entity: ItemEntity.name,
            entityId: item.getId(),
            authUser,
        }

        this.logSave(logSaveProps);

        return item;
    }
}
