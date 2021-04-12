import lazyInject from "../../../LazyInject";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default class GetItemUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: IdPayload): Promise<void>
    {
        // return await this.repository.getOne(payload.getId());
    }
}
