import {Request} from "express";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import ISort from "../../../App/InterfaceAdapters/Shared/ISort";
import IFilter from "../../../App/InterfaceAdapters/Shared/IFilter";
import IPagination from "../../../App/InterfaceAdapters/Shared/IPagination";
import Pagination from "../../../App/Presentation/Shared/Pagination";
import UserSort from "../Criterias/User.sort";
import UserFilter from "../Criterias/User.filter";

export default class ListUserRequest implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: Request | any)
    {
        this.pagination = new Pagination(request);
        this.sort = new UserSort(request);
        this.filter = new UserFilter(request);
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
