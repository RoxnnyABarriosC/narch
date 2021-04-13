import {PopulateOptions} from "mongoose";
import {ISqlOptions} from "./IBase.sql.repository";
import IBaseRepository from "./IBase.repository";

export declare interface IMongoOptions extends ISqlOptions
{
    populate?: string | PopulateOptions | PopulateOptions[]
}

export default interface IBaseMongoRepository<IDomain> extends IBaseRepository<IDomain>
{
    getBy(conditions: {}, options?: IMongoOptions): Promise<IDomain[]>;
    getOneBy(conditions: {}, options?: IMongoOptions): Promise<IDomain>;
    updateAndUpsert?(find: {}, updateFields: {}): Promise<IDomain>
    getByAggregation?(pipeline: any[]): Promise<any>
    updateMany?(find: {}, updateFields: {}): Promise<any>
}

