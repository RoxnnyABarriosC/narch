import _ from "lodash";
import moment from "moment";

export default abstract class Transformer
{
    abstract transform(data: any): any;

    handle(data: any): any
    {
        let result;

        if (data instanceof Array)
        {
            result = data.map((element: any) =>
            {
                return this.transform(element);
            });
        }
        else
        {
            result = this.transform(data);
        }

        return result;
    }

    validate(value: any, transformer: string = null): any
    {
        if(transformer)
        {
            // @ts-ignore
            return !_.isNull(value) && !_.isUndefined(value) ? this[transformer].handle(value) : null;
        }

        return !_.isNull(value) && !_.isUndefined(value) ? value : null;
    }

    unixDate(date: Date): number
    {
        return  !_.isNull(date) && !_.isUndefined(date) ? moment(date).utc().unix() : null;
    }

    getIds<T = any>(value: T): string | string[]
    {
        if (!_.isUndefined(value) && !_.isNull(value))
        {
            if (_.isArray(value))
            {
                return _.map(value, _value => _value?.getId());
            }

            else
            {
                // @ts-ignore
                return value?.getId();
            }
        }

        else
        {
            return null;
        }
    }
}

