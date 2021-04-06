import Filter from "../../../App/Presentation/Shared/Filter";

export default class FileFilter extends Filter
{
    static readonly NAME: string = 'name';

    getFields(): any
    {
        return [
            FileFilter.NAME
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}
