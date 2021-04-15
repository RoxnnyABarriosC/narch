import {Sort} from "@digichanges/shared-experience";

export default class RoleSort extends Sort
{
    static readonly ENABLE: string = 'enable';
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): any
    {
        return [
            RoleSort.ENABLE,
            RoleSort.CREATED_AT,
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[RoleSort.CREATED_AT]: 'desc'}
        ];
    }
}
