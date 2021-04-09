import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

export declare type AttributeConfig = {
    attribute: string,
    dbAttribute?: string,
    isBoolean?: boolean ,
    toLower?: boolean
};

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
    createFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attributeConfig: string | AttributeConfig, condition: FilterCondition, operator: FilterOperator, alias?: string): void;
    createSearchVector(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string , searchConfig: SearchConfig, condition: FilterCondition, alias?: string): void;
    createSearchLike(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string , searchConfig: SearchConfig, condition: FilterCondition, alias?: string): void;
    createMultiFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attributeConfig: string | AttributeConfig, condition: FilterCondition, operator: MultiFilterOperator, alias?: string): void;
    createBooleanMultiFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string, value: boolean, condition?: FilterCondition, alias?: string): void;
    getMultiFilter(entityFilter: any, attribute: string): string[];
}
