import IUserRepository from "../InterfaceAdapters/IUser.repository";
import UserEntity from "../Domain/User.entity";
import {injectable} from "inversify";
import IPaginator from "../../App/InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import UserFilter from "../Presentation/Criterias/User.filter";
import UserMongoSchema from "./User.mongo.schema";
import IUserDocument from "../InterfaceAdapters/IUser.document";
import BaseMongoRepository from "../../App/Infrastructure/Repositories/Shared/Base.mongo.repository";
import {Query} from "mongoose";
import MongoPaginator from "../../App/Presentation/Shared/MongoPaginator";

@injectable()
export default class UserMongoRepository extends BaseMongoRepository<UserEntity,IUserDocument> implements IUserRepository<IUserDocument>
{
    constructor()
    {
        super(UserEntity,UserMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IUserDocument[], IUserDocument> = this.repository.find({});
        const filter = criteria.getFilter();

        if (filter.has(UserFilter.ENABLE))
        {
            const _enable = filter.get(UserFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(UserFilter.ENABLE).equals(enable);
        }
        if (filter.has(UserFilter.EMAIL))
        {
            const email = filter.get(UserFilter.EMAIL);
            const rsearch = new RegExp(email, 'g');

            void queryBuilder.where(UserFilter.EMAIL).regex(rsearch);
        }
        if (filter.has(UserFilter.IS_SUPER_ADMIN))
        {
            const isSuperAdmin: boolean = filter.get(UserFilter.IS_SUPER_ADMIN);

            void queryBuilder.where(UserFilter.IS_SUPER_ADMIN).equals(isSuperAdmin);
        }

        void queryBuilder.populate('roles');

        return new MongoPaginator(queryBuilder, criteria);
    }
}