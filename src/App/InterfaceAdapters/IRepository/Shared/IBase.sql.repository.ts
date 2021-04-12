import IBaseRepository from "./IBase.repository";

export declare interface ISqlOptions
{
    initThrow? : boolean
}

export default interface IBaseSqlRepository<IDomain>  extends IBaseRepository<IDomain>
{
    getBy(condition: {}, options?: ISqlOptions): Promise<IDomain[]>;
    getOneBy(condition: {}, options?: ISqlOptions): Promise<IDomain>;
}

