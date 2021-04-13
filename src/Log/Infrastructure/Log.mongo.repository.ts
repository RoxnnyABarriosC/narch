import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import ILogRepository from "../InterfaceAdapters/ILog.repository";
import LogEntity from "../Domain/Log.entity";
import LogMongoSchema from "./Log.mongo.schema";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import LogFilter from "../Presentation/Criterias/Log.filter";
import BaseMongoRepository from "../../App/Infrastructure/Repositories/Shared/Base.mongo.repository";
import ILogDocument from "../InterfaceAdapters/ILog.document";
import {Query} from "mongoose";
import MongoPaginator from "../../App/Presentation/Shared/MongoPaginator";

@injectable()
export default class LogMongoRepository extends BaseMongoRepository<LogEntity,ILogDocument> implements ILogRepository<ILogDocument>
{
    constructor()
    {
        super(LogEntity,LogMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<ILogDocument[], ILogDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(LogFilter.ACTION))
        {
            const action: string = filter.get(LogFilter.ACTION);
            void queryBuilder.where(LogFilter.ACTION).equals(action);
        }

        if (filter.has(LogFilter.ENTITY))
        {
            const action: string = filter.get(LogFilter.ENTITY);
            void queryBuilder.where(LogFilter.ENTITY).equals(action);
        }

        if (filter.has(LogFilter.ENTITY_ID))
        {
            const action: string = filter.get(LogFilter.ENTITY_ID);
            void queryBuilder.where(LogFilter.ENTITY_ID).equals(action);
        }

        return new MongoPaginator(queryBuilder, criteria);
    }
}

