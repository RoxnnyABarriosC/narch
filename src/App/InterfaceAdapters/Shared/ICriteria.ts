import IPagination from "./IPagination";
import IFilter from "./IFilter";
import ISort from "./ISort";

export default interface ICriteria
{
    getPagination(): IPagination;
    getFilter(): IFilter;
    getSort(): ISort;
}
