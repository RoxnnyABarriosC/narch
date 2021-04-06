import {Request} from "express";
import FileSort from "../Criterias/File.sort";
import FileFilter from "../Criterias/File.filter";
import Pagination from "../../../App/Presentation/Shared/Pagination";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import ISort from "../../../App/InterfaceAdapters/Shared/ISort";
import IFilter from "../../../App/InterfaceAdapters/Shared/IFilter";
import IPagination from "../../../App/InterfaceAdapters/Shared/IPagination";

export default class ListFilesRequest implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: Request | any)
    {
        this.pagination = new Pagination(request);
        this.sort = new FileSort(request);
        this.filter = new FileFilter(request);
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

