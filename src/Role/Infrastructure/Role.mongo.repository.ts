import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import IRoleRepository from "../InterfaceAdapters/IRole.repository";
import RoleEntity from "../Domain/Role.entity";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import RoleFilter from "../Presentation/Criterias/Role.filter";
import BaseMongoRepository from "../../App/Infrastructure/Repositories/Shared/Base.mongo.repository";
import IRoleDocument from "../InterfaceAdapters/IRole.document";
import RoleMongoSchema from "./Role.mongo.schema";
import Roles from "../../Config/Roles";
import {Query} from "mongoose";
import MongoPaginator from "../../App/Presentation/Shared/MongoPaginator";

@injectable()
export default class RoleMongoRepository extends BaseMongoRepository<RoleEntity,IRoleDocument> implements IRoleRepository<IRoleDocument>
{
    constructor()
    {
        super(RoleEntity,RoleMongoSchema);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: Query<IRoleDocument[], IRoleDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(RoleFilter.ENABLE))
        {
            const _enable = filter.get(RoleFilter.ENABLE);
            const enable: boolean = _enable !== 'false';

            void queryBuilder.where(RoleFilter.ENABLE).equals(enable);
        }
        if (filter.has(RoleFilter.NAME))
        {
            const name = filter.get(RoleFilter.NAME);
            const rsearch = new RegExp(name, 'g');

            void queryBuilder.where(RoleFilter.NAME).regex(rsearch);
        }
        if (filter.has(RoleFilter.SLUG))
        {
            const slug = filter.get(RoleFilter.SLUG);
            const rsearch = new RegExp(slug, 'g');

            void queryBuilder.where(RoleFilter.SLUG).regex(rsearch);
        }

        void queryBuilder.where(RoleFilter.SLUG).ne(Roles.SUPER_ADMIN.toLowerCase());

        return new MongoPaginator(queryBuilder, criteria);
    }

}

