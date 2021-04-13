import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import SaveLogItemUseCase from "../../../Log/Domain/UseCases/SaveLogItem.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class RemoveItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const item: IItemDomain = await this.repository.delete(payload.getId());

        const log = new SaveLogItemUseCase(payload.getAuthUser(), item);
        await log.handle(LogActionEnum.REMOVE);

        return item;
    }
}
