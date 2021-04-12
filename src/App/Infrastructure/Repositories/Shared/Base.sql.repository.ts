import {injectable, unmanaged} from "inversify";
import {DeleteResult, EntitySchema, getRepository, Repository} from "typeorm";
import NotFoundException from "../../Exceptions/NotFound.exception";
import IBaseSqlRepository, {ISqlOptions} from "../../../InterfaceAdapters/IRepository/Shared/IBase.sql.repository";

@injectable()
export default class BaseSqlRepository<Entity extends IDomain, IDomain> implements IBaseSqlRepository<IDomain>
{
    private entity: any;
    protected repository: Repository<Entity>;

    constructor(@unmanaged() entity: any, @unmanaged() schema: EntitySchema)
    {
        this.entity = entity;
        this.repository = getRepository<Entity>(schema);
    }

    async save(entity: IDomain): Promise<IDomain>
    {
        return await this.repository.save(entity);
    }

    async getOne(id: string): Promise<IDomain>
    {
        const entity: IDomain = await this.repository.findOne(id);

        if (!entity)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entity;
    }

    async update(entity: IDomain): Promise<any>
    {
        await this.repository.save(entity);
    }

    async delete(id: string): Promise<DeleteResult>
    {
        return await this.repository.delete(id);
    }

    async getOneBy(condition: {}, options: ISqlOptions = { initThrow: true }): Promise<IDomain>
    {
        const { initThrow } = options;

        const entity: IDomain = await this.repository.findOne(condition);

        if(initThrow && !entity)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entity;
    }

    async getBy(condition: {}, options: ISqlOptions = { initThrow: false }): Promise<IDomain[]>
    {
        const { initThrow } = options;

        const entities: IDomain[] = await this.repository.find(condition);

        if(initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entities;
    }
}