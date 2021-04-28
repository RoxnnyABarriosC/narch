import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export declare type AttributeConfig <E = any, F = any> = {
    attribute: KeyAttribute<F> | string,
    dbAttribute?: KeyAttribute<E> | string,
    isBoolean?: boolean ,
    toLower?: boolean
} | KeyAttribute<F> | string;

export declare type KeyAttribute<F = any> = (keyof F);

export declare type SearchConfig = {
    attributesDB: string | string[] | AttributeDBConfig[]
    partialMatch?: boolean,
}

export declare type AttributeDBConfig = {
    tableAlias?: string,
    name: string,
    coalesce?: boolean,
    setweight?: SetweightRelevance,
}

export declare type SetweightRelevance = 'A' |  'B' |'C' |'D' ;

export declare type FilterCondition = 'andWhere' | 'orWhere' | 'where';

export declare type FilterOperator = '=' | 'ilike' | '>' | '>=' | '<=' | 'in';

export declare type MultiFilterOperator = '=' | 'ilike';

export default interface IFilter
{
    values(): Map<string, any>;
    get(key: string): any;
    getArray(key: string): any[];
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): any[];
    createFilter<E = any, F = any>(queryBuilder: SelectQueryBuilder<E>, entityFilter: F, attributeConfig: AttributeConfig<E, F>, condition: FilterCondition, operator: FilterOperator, alias?: string): void;
    createSearchVector<E = any, F = any>(queryBuilder: SelectQueryBuilder<E>, entityFilter: F, attribute: KeyAttribute<F> , searchConfig: SearchConfig, condition: FilterCondition, alias?: string): void;
    createSearchLike<E = any, F = any>(queryBuilder: SelectQueryBuilder<E>, entityFilter: F, attribute:  AttributeConfig<E, F> , searchConfig: SearchConfig, condition: FilterCondition, alias?: string): void;
    createMultiFilter<E = any, F = any>(queryBuilder: SelectQueryBuilder<E>, entityFilter: F, attributeConfig: AttributeConfig<E, F>, condition: FilterCondition, operator: MultiFilterOperator, alias?: string): void;
    createBooleanMultiFilter<E = any, F = any>(queryBuilder: SelectQueryBuilder<E>, entityFilter: F, attribute: KeyAttribute<F>, value: boolean, condition?: FilterCondition, alias?: string): void;
    getMultiFilter<F = any>(entityFilter: F, attribute: KeyAttribute<F>): string[];
}
