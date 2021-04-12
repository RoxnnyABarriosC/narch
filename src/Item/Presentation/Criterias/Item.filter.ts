import Filter from "../../../App/Presentation/Shared/Filter";

export default class ItemFilter extends Filter
{
    static readonly NAME: string = 'name';

    getFields(): any
    {
        return [
            ItemFilter.NAME,
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}
