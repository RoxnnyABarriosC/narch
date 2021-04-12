import {Sort} from "@digichanges/shared-experience";

export default class ItemSort extends Sort
{
    static readonly NAME: string = 'NAME';

    getFields(): any
    {
        return [
            ItemSort.NAME
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[ItemSort.NAME]: 'asc'}
        ];
    }
}
