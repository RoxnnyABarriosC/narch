import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import IItemRepository from "../InterfaceAdapters/IItem.repository";
import ItemEntity from "../Domain/Item.entity";
import ItemMongoSchema from "./Item.mongo.schema";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import ItemFilter from "../Presentation/Criterias/Item.filter";
import BaseMongoRepository from "../../App/Infrastructure/Repositories/Shared/Base.mongo.repository";
import IItemDocument from "../InterfaceAdapters/IItem.document";
import {Query} from "mongoose";
import MongoPaginator from "../../App/Presentation/Shared/MongoPaginator";

@injectable()
export default class ItemMongoRepository extends BaseMongoRepository<ItemEntity,IItemDocument> implements IItemRepository<IItemDocument>
{
    constructor()
    {
        super(ItemEntity,ItemMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IItemDocument[], IItemDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(ItemFilter.NAME)) {
            const name: string = filter.get(ItemFilter.NAME);
            const rsearch = new RegExp(name, "g");

            queryBuilder.where(ItemFilter.NAME).regex(rsearch);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }
}

