import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import {ILogRemoveProps} from "../../../App/Infrastructure/Logger/Logger";
import ItemEntity from "../Item.entity";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import ItemLogTransformer from "../../Presentation/Transformers/ItemLog.transformer";

export default class RemoveItemUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        const item: IItemDomain = await this.repository.delete(payload.getId());

        const logRemoveProps: ILogRemoveProps = {
            type: ItemEntity.name,
            entity: ItemEntity.name,
            entityId: item.getId(),
            removeEntity: item,
            transformer: new ItemLogTransformer(),
            authUser,
        }

        this.logRemove(logRemoveProps);

        return item;
    }
}
