import ICriteria from "../../Shared/ICriteria";
import IPaginator from "../../Shared/IPaginator";
import {DeleteResult} from "typeorm";

export default interface IBaseRepository<IDomain>
{
    save(entity: IDomain): Promise<IDomain>;
    update(entity: IDomain): Promise<IDomain>;
    getOne(id: string): Promise<IDomain>;
    list?(criteria: ICriteria): Promise<IPaginator>;
    delete(id: string): Promise<DeleteResult | IDomain>;
}

