import {Request} from "express";
import Pagination from "../../../App/Presentation/Shared/Pagination";
import ItemSort from "../Criterias/Item.sort";
import ItemFilter from "../Criterias/Item.filter";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import ISort from "../../../App/InterfaceAdapters/Shared/ISort";
import IFilter from "../../../App/InterfaceAdapters/Shared/IFilter";
import IPagination from "../../../App/InterfaceAdapters/Shared/IPagination";

export default class ListItemsRequest implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: Request | any)
    {
        this.pagination = new Pagination(request);
        this.sort = new ItemSort(request);
        this.filter = new ItemFilter(request);
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }

    getFilter(): IFilter
    {
        return this.filter;
    }

    getSort(): ISort
    {
        return this.sort;
    }
}
