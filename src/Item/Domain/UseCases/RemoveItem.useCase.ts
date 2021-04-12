import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";

export default class RemoveItemUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: IdPayload): Promise<any>
    {
        // return await this.repository.delete(payload.getId());
    }
}
