import IUserRepository from "../InterfaceAdapters/IUser.repository";
import UserEntity from "../Domain/User.entity";
import {DeleteResult, getRepository, Repository} from "typeorm";
import {injectable} from "inversify";
import IUserDomain from "../InterfaceAdapters/IUser.domain";
import NotFoundException from "../../App/Infrastructure/Exceptions/NotFound.exception";
import IPaginator from "../../App/InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../App/InterfaceAdapters/Shared/ICriteria";
import Paginator from "../../App/Presentation/Shared/Paginator";
import UserSqlSchema from "./User.sql.schema";

@injectable()
class UserSqlRepository implements IUserRepository
{
    private repository: Repository<UserEntity>;

    constructor()
    {
        this.repository = getRepository<UserEntity>(UserSqlSchema);
    }

    async save (user: IUserDomain): Promise<IUserDomain>
    {
        return await this.repository.save(user);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        const user = await this.repository.findOne(id);

        if (!user)
        {
            throw new NotFoundException('User');
        }

        return user;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");

        queryBuilder.leftJoinAndSelect("i.roles", "role");

        return new Paginator(queryBuilder, criteria);
    }

    async update(user: IUserDomain): Promise<any>
    {
        await this.repository.save(user);
    }

    async delete(id: string): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

    async getBy(condition: {}, initThrow = false): Promise<IUserDomain[]>
    {
        const users: IUserDomain[] = await this.repository.find(condition);

        if(initThrow && users.length === 0)
        {
            throw new NotFoundException('User');
        }

        return users;
    }

    async getOneBy(condition: {}, initThrow = true): Promise<any>
    {
        const user: IUserDomain = await this.repository.findOne(condition);

        if(initThrow && !user)
        {
            throw new NotFoundException('File');
        }

        return user;
    }

}

export default UserSqlRepository;
