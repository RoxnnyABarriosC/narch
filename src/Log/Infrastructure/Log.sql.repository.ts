import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";
import LogEntity from "../Domain/Log.entity";
import ILogDomain from "../InterfaceAdapters/ILog.domain";
import LogFilter from "../Presentation/Criterias/Log.filter";
import ILogRepository from "../InterfaceAdapters/ILog.repository";
import LogSqlSchema from "./Log.sql.schema";

@injectable()
export default class LogSqlRepository extends BaseSqlRepository<LogEntity,ILogDomain> implements ILogRepository<ILogDomain>
{
    constructor()
    {
        super(LogEntity,LogSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        filter.createFilter(queryBuilder, LogFilter, LogFilter.ACTION, 'andWhere','=');
        filter.createFilter(queryBuilder, LogFilter, LogFilter.ENTITY, 'andWhere','=');
        filter.createFilter(queryBuilder, LogFilter, LogFilter.ENTITY_ID, 'andWhere','=');

        queryBuilder.innerJoinAndSelect("i.createdBy", "createdBy");

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }
}
