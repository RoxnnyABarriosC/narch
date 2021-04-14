import ICriteria from "../../Shared/ICriteria";
import IPaginator from "../../Shared/IPaginator";

export default interface IBaseRepository<IDomain>
{
    save(entity: IDomain): Promise<IDomain>;
    update(entity: IDomain): Promise<IDomain>;
    getOne(id: string): Promise<IDomain>;
    list?(criteria: ICriteria): Promise<IPaginator>;
    delete(id: string): Promise<IDomain>;
    exist(condition: {}, select: string[], initThrow?: boolean): Promise<any>;
}

