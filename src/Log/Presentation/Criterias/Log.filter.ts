import Filter from "../../../App/Presentation/Shared/Filter";

export default class LogFilter extends Filter
{
    static readonly ACTION: string = 'action';
    static readonly ENTITY: string = 'entity';
    static readonly ENTITY_ID: string = 'entityId';

    getFields(): any
    {
        return [
            LogFilter.ACTION,
            LogFilter.ENTITY,
            LogFilter.ENTITY_ID,
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}
