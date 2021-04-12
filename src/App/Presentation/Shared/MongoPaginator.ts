import {Query} from 'mongoose';
import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import IFilter from "../../InterfaceAdapters/Shared/IFilter";
import ISort from "../../InterfaceAdapters/Shared/ISort";
import IPagination from "../../InterfaceAdapters/Shared/IPagination";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

export default class MongoPaginator implements IPaginator
{
    private documentQuery: Query<any[], any>;
    private filter: IFilter;
    private sort: ISort;
    private pagination: IPagination;
    private total: number;

    constructor(documentQuery: Query<any[], any>, criteria: ICriteria)
    {
        this.documentQuery = documentQuery;
        this.filter = criteria.getFilter();
        this.sort = criteria.getSort();
        this.pagination = criteria.getPagination();
    }

    public getTotal(): number
    {
        return this.total;
    }

    public getCurrentUrl(): string
    {
        return this.pagination.getCurrentUrl();
    }

    // TODO: Dont show next url when it doesnt exist more data
    public getNextUrl(): string
    {
        return this.pagination.getNextUrl();
    }

    public async paginate(): Promise<any>
    {
        // TODO: Add filter logic

        this.addOrderBy();
        this.addPagination();

        const data = await this.documentQuery.exec();

        this.total = data.length;

        return data;
    }

    public getExist(): boolean
    {
        return this.pagination.getExist();
    }
    // TODO: See when multiple sorts
    private addOrderBy()
    {
        const sorts = this.sort.get();
        const _objectSort = {};

        sorts.forEach((value: string, key: string) =>
        {
            let order: any = value.toUpperCase();
            order = (order === 'DESC') ? -1 : 1;

            const obj = {[key]: order};
            Object.assign(_objectSort, obj);
        });

        this.documentQuery.sort(_objectSort);
    }

    private addPagination()
    {
        const exist = this.pagination.getExist();

        if (exist)
        {
            this.documentQuery
                .skip(this.pagination.getOffset())
                .limit(this.pagination.getLimit());
        }
    }
}
