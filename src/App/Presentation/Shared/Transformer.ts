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
            return !_.isNaN(value) && !_.isUndefined(value) ? this[transformer].handle(value) : null;
        }

        return !_.isNaN(value) && !_.isUndefined(value) ? value : null;
    }

    transformDate(date: Date): number
    {
        return  !_.isNaN(date) && !_.isUndefined(date) ? moment(date).utc().unix() : null;
    }
}

