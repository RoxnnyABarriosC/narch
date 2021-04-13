import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";
import ItemEntity from "../Domain/Item.entity";
import IItemDomain from "../InterfaceAdapters/IItem.domain";
import ItemFilter from "./../Presentation/Criterias/Item.filter";
import IItemRepository from "../InterfaceAdapters/IItem.repository";
import ItemSqlSchema from "./Item.sql.schema";

@injectable()
export default class ItemSqlRepository extends BaseSqlRepository<ItemEntity,IItemDomain> implements IItemRepository<IItemDomain>
{
    constructor()
    {
        super(ItemEntity,ItemSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        filter.createFilter(queryBuilder, ItemFilter, ItemFilter.NAME, 'andWhere','ilike');

        queryBuilder.innerJoinAndSelect("i.createdBy", "createdBy");
        queryBuilder.innerJoinAndSelect("i.updatedBy", "updatedBy");

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }
}
