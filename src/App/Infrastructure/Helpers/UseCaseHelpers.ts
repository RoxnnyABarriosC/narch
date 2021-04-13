import _ from "lodash";

export default class UseCaseHelpers
{
    protected async updateOrCreateRelationshipById<IDomain, IReturnDomain>(entity: IDomain, attribute: string , id: string, repository: string): Promise<IReturnDomain | null>
    {
        if (_.isNull(id))
        {
            return id;
        }

        if (!_.isNull(id) && !_.isUndefined(id))
        {
            // @ts-ignore
            if (entity[attribute]?.getId() === id)
            {
                // @ts-ignore
                return entity[attribute];
            }

            else
            {
                // @ts-ignore
                return await this[repository].getOne(id);
            }
        }

        if (_.isUndefined(id))
        {
            // @ts-ignore
            return entity[attribute];
        }
    }
}