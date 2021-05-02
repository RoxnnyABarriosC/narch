import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import ContainerFactory from "../../Factories/Container.factory";
import {REPOSITORIES} from "../../../../Repositories";
import _ from "lodash";

interface UniqueParam {
    repository: REPOSITORIES,
    dbAttribute?: string,
    property?: string,
}

export function Unique(params: UniqueParam, validationOptions?: ValidationOptions)
{
    return (object: any, propertyName: string) =>
    {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [params],
            validator: UniqueConstraint
        });
    };
}

@ValidatorConstraint({async: true})
export class UniqueConstraint implements ValidatorConstraintInterface
{
    async validate(value: any, args: ValidationArguments)
    {
        // tslint:disable-next-line:no-shadowed-variable
        const [params] = args.constraints;
        // @ts-ignore
        const repository = ContainerFactory.create(REPOSITORIES[params.repository]);

        let key: string = args.property;

        if (!_.isUndefined(params.dbAttribute))
        {
            key = params.dbAttribute;
        }

        const exist = await repository.exist({[key]:value},['_id']);

        if (exist)
        {
            if (!_.isUndefined(params.property))
            {
                const relatedValue = (args.object as any)[params.property];
                return  exist._id === relatedValue;
            }
            else
            {
                return false
            }
        }

        return true;
    }
}
