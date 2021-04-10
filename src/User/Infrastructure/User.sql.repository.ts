import IUserRepository from "../InterfaceAdapters/IUser.repository";
import UserEntity from "../Domain/User.entity";
import {injectable} from "inversify";
import IUserDomain from "../InterfaceAdapters/IUser.domain";
import IPaginator from "../../App/InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import Paginator from "../../App/Presentation/Shared/Paginator";
import UserSqlSchema from "./User.sql.schema";
import UserFilter from "../Presentation/Criterias/User.filter";
import RoleFilter from "../../Role/Presentation/Criterias/Role.filter";
import BaseSqlRepository from "../../App/Infrastructure/Repositories/Shared/Base.sql.repository";

@injectable()
export default class UserSqlRepository extends BaseSqlRepository<UserEntity,IUserDomain> implements IUserRepository<IUserDomain>
{
    constructor()
    {
        super(UserEntity,UserSqlSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        filter.createFilter(queryBuilder,UserFilter,UserFilter.EMAIL,'andWhere', 'ilike',);
        filter.createFilter(queryBuilder,UserFilter,UserFilter.ENABLE,'andWhere', '=');
        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.NAME,'andWhere', 'ilike', 'role');
        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.SLUG,'andWhere', '=', 'role');
        filter.createFilter(queryBuilder,RoleFilter,RoleFilter.ENABLE,'andWhere', '=', 'role');

        queryBuilder.leftJoinAndSelect("i.roles", "role");

        return new Paginator(queryBuilder, criteria);
    }

}