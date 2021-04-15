import {Sort} from "@digichanges/shared-experience";

export default class ItemSort extends Sort
{
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): any
    {
        return [
            ItemSort.CREATED_AT
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[ItemSort.CREATED_AT]: 'desc'}
        ];
    }
}
