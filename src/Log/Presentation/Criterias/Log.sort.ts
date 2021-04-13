import Sort from "../../../App/Presentation/Shared/Sort";

export default class LogSort extends Sort
{
    static readonly ACTION: string = 'action';
    static readonly ENTITY: string = 'entity';
    static readonly CREATED_AT: string = 'createdAt';

    getFields(): any
    {
        return [
            LogSort.ACTION,
            LogSort.ENTITY,
            LogSort.CREATED_AT,
        ];
    }

    getDefaultSorts(): any
    {
        return [
            {[LogSort.CREATED_AT]: 'desc'}
        ];
    }
}
