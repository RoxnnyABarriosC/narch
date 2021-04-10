import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import IRoleRepository from "../InterfaceAdapters/IRole.repository";
import RoleEntity from "../Domain/Role.entity";
import RoleSqlSchema from "./Role.sql.schema";
import IRoleDomain from "../InterfaceAdapters/IRole.domain";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import RoleFilter from "../Presentation/Criterias/Role.filter";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";

@injectable()
export default class RoleSqlRepository extends BaseSqlRepository<RoleEntity,IRoleDomain> implements IRoleRepository<IRoleDomain>
{
    constructor()
    {
        super(RoleEntity,RoleSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.NAME,'andWhere', 'ilike');
        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.SLUG,'andWhere', '=');
        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.ENABLE,'andWhere', '=');

        return new Paginator(queryBuilder, criteria);
    }
}

