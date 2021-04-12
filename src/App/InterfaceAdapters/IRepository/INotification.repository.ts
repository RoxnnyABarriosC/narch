import ICriteria from "../Shared/ICriteria";
import IPaginator from "../Shared/IPaginator";

export default interface INotificationRepository
{
    save(element: any): Promise<any>;
    getOne(id: string): Promise<any>;
    list(criteria: ICriteria): Promise<IPaginator>;
}