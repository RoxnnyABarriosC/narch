import {Request} from "express";
import Pagination from "../../../App/Presentation/Shared/Pagination";
import LogSort from "../Criterias/Log.sort";
import LogFilter from "../Criterias/Log.filter";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import ISort from "../../../App/InterfaceAdapters/Shared/ISort";
import IFilter from "../../../App/InterfaceAdapters/Shared/IFilter";
import IPagination from "../../../App/InterfaceAdapters/Shared/IPagination";

export default class ListLogsRequest implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: Request | any)
    {
        this.pagination = new Pagination(request);
        this.sort = new LogSort(request);
        this.filter = new LogFilter(request);
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
