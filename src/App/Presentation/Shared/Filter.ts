import {Request} from "express";
import IFilter, {
    AttributeConfig, AttributeDBConfig,
    FilterCondition,
    FilterOperator,
    MultiFilterOperator, SearchConfig, SetweightRelevance
} from "../../InterfaceAdapters/Shared/IFilter";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import _ from "lodash";
import {Brackets} from "typeorm";

export default  abstract class Filter implements IFilter
{
    private readonly filters: Map<string, any>;

    constructor(request: Request | any)
    {
        this.filters = new Map<string, string>();
        let queryFilters: any = request.query.hasOwnProperty('filter') ? request.query.filter : [];
        let defaultFilters: any = this.getDefaultFilters();
        let keys = this.getFields();

        defaultFilters.forEach((defaultFilter: any) => {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });

        let newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: any = request.query.filter;

            return {
                [key]: filter[key]
            };
        }).filter((value => {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) => {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });
    }

    get(key: string): string
    {
        return this.filters.has(key) ? this.filters.get(key) : '';
    }

    getArray(): any
    {
        return this.filters.entries();
    }

    has(key: string): boolean
    {
        return this.filters.has(key);
    }

    isEmpty(): boolean
    {
        return this.filters.size === 0;
    }

    values(): Map<string, any>
    {
        return this.filters;
    }

    createFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attributeConfig: string | AttributeConfig, condition: FilterCondition, operator: FilterOperator, alias: string = 'i'): void
    {
        let attribute: string = attributeConfig as string;
        let dbAttribute: string;
        let booleanAttribute: boolean = false;
        let toLower: boolean = false

        if (_.isObject(attributeConfig))
        {
            attribute = attributeConfig.attribute;

            if (attributeConfig.dbAttribute)
            {
                dbAttribute = attributeConfig.dbAttribute;
            }

            if (attributeConfig.isBoolean)
            {
                booleanAttribute = attributeConfig.isBoolean;
            }

            if (attributeConfig.toLower)
            {
                toLower = attributeConfig.toLower;
            }
        }

        if (_.isString(attributeConfig) || _.isUndefined(dbAttribute))
        {
            dbAttribute = `${entityFilter[attribute]}`;
        }

        if (this.has(entityFilter[attribute]))
        {
            let valueAttr: string | string[] | boolean = this.get(entityFilter[attribute]).trim();
            let aliasAttr: string = `:${entityFilter[attribute]}`;

            if (booleanAttribute)
            {
                valueAttr = valueAttr !== 'false';
            }

            if (operator === 'in')
            {
                aliasAttr = `(:...${entityFilter[attribute]})`;
                valueAttr = this.getMultiFilter(entityFilter, attribute);
            }

            if (operator === 'ilike')
            {
                aliasAttr = `:${entityFilter[attribute]}`;
                valueAttr = `%${valueAttr}%`;
            }

            if (toLower)
            {
                queryBuilder[condition](`LOWER(${alias}.${dbAttribute}) ${operator} LOWER(${aliasAttr})`);
            }

            else
            {
                queryBuilder[condition](`${alias}.${dbAttribute} ${operator} ${aliasAttr}`);

            }

            queryBuilder.setParameter(entityFilter[attribute], valueAttr);
        }
    }

    getMultiFilter(entityFilter: any, attribute: string): string[]
    {
        let filters: string[] = [];

        if (this.has(entityFilter[attribute]))
        {
            this.get(entityFilter[attribute]).trim().split(',').map(attr => {
                if (attr.trim().length > 0) {
                    filters.push(attr.trim());
                }
            });
        }

        return filters;
    }

    createBooleanMultiFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string, value: boolean = true, condition: FilterCondition = 'andWhere', alias: string = 'i'): void
    {
        if (this.has(entityFilter[attribute]))
        {
            this.get(entityFilter[attribute]).trim().split(',').map((attr: string, index: number) => {
                const where: string = index === 0 ? condition : `orWhere`;
                if (attr.trim().length > 0)
                {
                    // @ts-ignore
                    queryBuilder[where](`${alias}.${attr.trim()} = :value`);
                    queryBuilder.setParameter('value', value);
                }
            });
        }
    }

    createMultiFilter(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attributeConfig: string | AttributeConfig, condition: FilterCondition, operator: MultiFilterOperator, alias: string = 'i'): void
    {
        let attribute: string = attributeConfig as string;
        let dbAttribute: string;
        let toLower: boolean = false

        if (_.isObject(attributeConfig))
        {
            attribute = attributeConfig.attribute;

            if (attributeConfig.dbAttribute)
            {
                dbAttribute = attributeConfig.dbAttribute;
            }

            if (attributeConfig.toLower)
            {
                toLower = attributeConfig.toLower;
            }
        }

        if (_.isString(attributeConfig) || _.isUndefined(dbAttribute))
        {
            dbAttribute = `${entityFilter[attribute]}`;
        }

        if (this.has(entityFilter[attribute]))
        {
            queryBuilder[condition]( new Brackets( qb => {
                this.get(entityFilter[attribute]).trim().split(',').map((attr: string, index: number) => {
                    const where: string = index === 0 ? `where` : `orWhere`;

                    let aliasAttr: string = `${entityFilter[attribute]}_${index}`;
                    let valueAttr: string = attr.trim();

                    if (operator === 'ilike')
                    {
                        valueAttr = `%${valueAttr}%`;
                    }

                    if (valueAttr.length > 0)
                    {
                        if (toLower)
                        {
                            // @ts-ignore
                            qb[where](`LOWER(${alias}.${dbAttribute}) ${operator} LOWER(:${aliasAttr})`, {[aliasAttr]: valueAttr});
                        }

                        else
                        {
                            // @ts-ignore
                            qb[where](`${alias}.${dbAttribute} ${operator} :${aliasAttr}`, {[aliasAttr]: valueAttr});
                        }
                    }
                });
            }));
        }
    }

    createSearchVector(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string , searchConfig: SearchConfig, condition: FilterCondition, alias: string = 'i'): void
    {
        const aliasAttr = `:${entityFilter[attribute]}`;

        const partialMatch: boolean =  _.isUndefined(searchConfig?.partialMatch) ? true : searchConfig.partialMatch;

        let attrsDB: string | string[] | AttributeDBConfig[] = searchConfig.attributesDB;

        let searchAtt: string | string[];

        if(typeof attrsDB === 'string')
        {
            searchAtt = `to_tsvector(${alias}.${attrsDB})`;
        }

        if (typeof attrsDB === 'object')
        {
            if (typeof attrsDB[0] === "string")
            {
                // @ts-ignore
                searchAtt = attrsDB.map((attrDB: string) => `to_tsvector(${alias}.${attrDB})`).join(' || ');
            }

            if (typeof attrsDB[0] === "object")
            {
                // @ts-ignore
                searchAtt = attrsDB.map((attrDB: AttributeDBConfig ) => {
                    const coalesce: boolean = _.isUndefined(attrDB?.coalesce) ? false : attrDB.coalesce;
                    const setweight: boolean | SetweightRelevance = _.isUndefined(attrDB?.setweight) ? false : attrDB.setweight;
                    const tableAlias: string = _.isUndefined(attrDB?.tableAlias) ? alias : attrDB.tableAlias;

                    const attr: string = `${tableAlias}.${attrDB.name}`;

                    let attrDBSearch: string = `to_tsvector(${attr})`;

                    if (coalesce)
                    {
                        attrDBSearch = attrDBSearch.replace(attr, `coalesce(${attr},'')`);
                    }

                    if (setweight)
                    {
                        attrDBSearch = `setweight(${attrDBSearch}, '${setweight}')`;
                    }

                    return attrDBSearch;
                }).join(' || ');
            }
        }

        if (this.has(entityFilter[attribute]))
        {
            let valueAttr: string | string[] = this.get(entityFilter[attribute]).trim();

            if (valueAttr.length > 0)
            {
                if(partialMatch)
                {
                    valueAttr = valueAttr.split(' ').map((value) => `${value}:*`).join(' | ');
                }

                queryBuilder.addSelect(`ts_rank_cd( (${searchAtt}) , to_tsquery(${aliasAttr}))`, 'rank');
                queryBuilder[condition](`to_tsquery(${aliasAttr}) @@ (${searchAtt})`);
                queryBuilder.setParameter(entityFilter[attribute], valueAttr);
                queryBuilder.orderBy('rank', 'DESC');
            }
        }
    }

    createSearchLike(queryBuilder: SelectQueryBuilder<any>, entityFilter: any, attribute: string , searchConfig: SearchConfig, condition: FilterCondition, alias: string = 'i'): void
    {
        const aliasAttr = `:${entityFilter[attribute]}`;

        let attrsDB: string | string[] | AttributeDBConfig[] = searchConfig.attributesDB;

        let searchAtt: string | string[];

        if(typeof attrsDB === 'string')
        {
            searchAtt = `${alias}.${attrsDB}`;
        }

        if (typeof attrsDB === 'object')
        {
            if (typeof attrsDB[0] === "string")
            {
                // @ts-ignore
                searchAtt = attrsDB.map((attrDB: string) => `${alias}.${attrDB}`).join(' || ');
            }

            if (typeof attrsDB[0] === "object")
            {
                // @ts-ignore
                searchAtt = attrsDB.map((attrDB: AttributeDBConfig ) => {
                    const coalesce: boolean = _.isUndefined(attrDB?.coalesce) ? false : attrDB.coalesce;
                    const tableAlias: string = _.isUndefined(attrDB?.tableAlias) ? alias : attrDB.tableAlias;

                    const attr: string = `${tableAlias}.${attrDB.name}`;

                    let attrDBSearch: string = `${attr}`;

                    if (coalesce)
                    {
                        attrDBSearch = attrDBSearch.replace(attr, `coalesce(${attr},'')`);
                    }

                    return attrDBSearch;
                }).join(' || ');
            }
        }

        if (this.has(entityFilter[attribute]))
        {
            let valueAttr: string | string[] = this.get(entityFilter[attribute]).trim().split(' ').map((attr) => `%${attr}%`).join(' ');

            if (valueAttr.length > 0)
            {
                queryBuilder[condition](`${searchAtt} ILIKE ${aliasAttr}`);
                queryBuilder.setParameter(entityFilter[attribute], valueAttr);
            }
        }
    }

    abstract getFields(): any[];
    abstract getDefaultFilters(): any;
}