import ICriteria from "../Shared/ICriteria";
import IPaginator from "../Shared/IPaginator";

export default interface IBaseRepository
{
    save(element: any): Promise<any>;
    update(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
    delete(id: any): Promise<any>;
    getBy?(condition: {}, initThrow?: boolean): Promise<any>;
    getOneBy?(condition: {}, initThrow?: boolean): Promise<any>;
}

