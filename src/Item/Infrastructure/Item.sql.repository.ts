import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";
import ItemEntity from "../Domain/Item.entity";
import IItemDomain from "../InterfaceAdapters/IItem.domain";
import FileSqlSchema from "../../File/Infrastructure/File.sql.schema";
import ItemFilter from "./../Presentation/Criterias/Item.filter";
import IItemRepository from "../InterfaceAdapters/IItem.repository";

@injectable()
export default class ItemSqlRepository extends BaseSqlRepository<ItemEntity,IItemDomain> implements IItemRepository<IItemDomain>
{
    constructor()
    {
        super(ItemEntity,FileSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        filter.createFilter(queryBuilder, ItemFilter, ItemFilter.NAME, 'andWhere','ilike');

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }
}
