import IUserRepository from "../InterfaceAdapters/IUser.repository";
import UserEntity from "../Domain/User.entity";
import {injectable} from "inversify";
import IUserDomain from "../InterfaceAdapters/IUser.domain";
import IPaginator from "../../App/InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import Paginator from "../../App/Presentation/Shared/Paginator";
import UserSqlSchema from "./User.sql.schema";
import UserFilter from "../Presentation/Criterias/User.filter";
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
        queryBuilder.andWhere("i.isSuperAdmin != true");

        filter.createFilter(queryBuilder,UserFilter,'EMAIL','andWhere', 'ilike');
        filter.createFilter(queryBuilder,UserFilter,'ENABLE','andWhere', '=');
        filter.createFilter(queryBuilder,UserFilter,'ROLE_NAME','andWhere', 'ilike', 'role');
        filter.createFilter(queryBuilder,UserFilter,'ROLE_SLUG','andWhere', '=', 'role');
        filter.createFilter(queryBuilder,UserFilter,{attribute: 'ROLE_ENABLE', dbAttribute: 'enable'},'andWhere', '=', 'role');

        queryBuilder.leftJoinAndSelect("i.roles", "role");
        queryBuilder.leftJoinAndSelect("i.mainPicture", "mainPicture");

        return new Paginator(queryBuilder, criteria);
    }
}