import {injectable, unmanaged} from "inversify";
import NotFoundException from "../../Exceptions/NotFound.exception";
import { Model, Schema} from "mongoose";
import {connection} from "../../Database/MongooseCreateConnection";
import IBaseDocumentDomain from "../../../InterfaceAdapters/Shared/IBaseDocumentDomain";
import IBaseMongoRepository, {IMongoOptions} from "../../../InterfaceAdapters/IRepository/Shared/IBase.mongo.repository";

@injectable()
export default class BaseMongoRepository<Entity , IDomain extends IBaseDocumentDomain> implements IBaseMongoRepository<IDomain>
{
    private entity: any;
    protected repository: Model<IDomain>;

    constructor(@unmanaged() entity: any, @unmanaged() schema: Schema)
    {
        this.entity = entity;
        this.repository = connection.model<IDomain>(entity.name.replace('Entity',''));
    }

    async save(entity: IDomain): Promise<IDomain>
    {
        return await this.repository.create(entity);
    }

    async getOne(id: string): Promise<IDomain>
    {
        // @ts-ignore
        const entity: IDomain = await this.repository.findOne({ _id: id });

        if (!entity)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entity;
    }

    async update(entity: IDomain): Promise<IDomain>
    {
        // @ts-ignore
        return this.repository.findByIdAndUpdate({_id: entity.getId()}, entity);
    }

    async delete(id: string): Promise<IDomain>
    {
        const entity = await this.repository.findByIdAndDelete({_id: id});

        if (!entity)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entity;
    }

    async getOneBy(conditions: {}, options: IMongoOptions = { initThrow: true, populate: null }): Promise<IDomain>
    {
        const { initThrow , populate } = options;

        const entity: IDomain | null  = await this.repository.findOne(conditions).populate(populate).exec();

        if(initThrow && !entity)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entity;
    }

    async getBy(conditions: {}, options: IMongoOptions = { initThrow: true, populate: null }): Promise<IDomain[]>
    {
        const { initThrow , populate } = options;

        const entities: IDomain[] = await this.repository.find(conditions).populate(populate).exec();

        if(initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entity.name.replace('Entity',''));
        }

        return entities;
    }

    async getByAggregation(pipeline: any[] = []): Promise<any>
    {
        return await this.repository.aggregate(pipeline).exec();
    }

    async updateAndUpsert(find: {}, updateFields: {}): Promise<IDomain>
    {
        return await this.repository.findOneAndUpdate(find, updateFields, {upsert: true, new: true});
    }

    async updateMany(find: {}, updateFields: {}): Promise<any>
    {
        return await this.repository.updateMany(find, updateFields, {multi: true});
    }
}