import lazyInject from "../../../LazyInject";
import {IPaginator} from "@digichanges/shared-experience";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import {REPOSITORIES} from "../../../Repositories";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";

export default class ListItemsUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IItemRepository<IItemDomain>;

    async handle(payload: ICriteria): Promise<void>
    {
        // return await this.repository.list(payload);
    }
}
