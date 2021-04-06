import {Sort} from "@digichanges/shared-experience";

export default class RoleSort extends Sort
{
    static readonly SLUG: string = 'slug';

    getFields(): any
    {
        return [
            RoleSort.SLUG
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[RoleSort.SLUG]: 'asc'}
        ];
    }
}
