import {DeleteResult, getRepository, Repository} from "typeorm";
import {injectable} from "inversify";
import {IPaginator} from "@digichanges/shared-experience";
import IRoleRepository from "../InterfaceAdapters/IRole.repository";
import RoleEntity from "../Domain/Role.entity";
import RoleSqlSchema from "./Role.sql.schema";
import IRoleDomain from "../InterfaceAdapters/IRole.domain";
import NotFoundException from "../../App/Infrastructure/Exceptions/NotFound.exception";
import Paginator from "../../App/Presentation/Shared/Paginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";

@injectable()
export default class RoleSqlRepository implements IRoleRepository
{
    private repository: Repository<RoleEntity>;

    constructor()
    {
        this.repository = getRepository<RoleEntity>(RoleSqlSchema);
    }

    async save (role: IRoleDomain ): Promise<IRoleDomain>
    {
        return await this.repository.save(role);
    }

    async getOne(id: string): Promise<IRoleDomain>
    {
        const role = await this.repository.findOne(id);

        if (!role)
        {
            throw new NotFoundException('Role');
        }

        return role;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        return new Paginator(queryBuilder, criteria);
    }

    async update(role: IRoleDomain): Promise<any>
    {
        await this.repository.save(role);
    }

    async delete(id: any): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

    async getBy(condition: {}, initThrow = false): Promise<IRoleDomain[]>
    {
        const roles: IRoleDomain[] = await this.repository.find(condition);

        if(initThrow && roles.length === 0)
        {
            throw new NotFoundException('Role');
        }

        return roles
    }

    async getOneBy(condition: {}, initThrow = true): Promise<any>
    {
        const role: IRoleDomain = await this.repository.findOne(condition);

        if(initThrow && !role)
        {
            throw new NotFoundException('Role');
        }

        return role
    }
}

