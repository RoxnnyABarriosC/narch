import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import ContainerFactory from "../../Factories/Container.factory";
import {REPOSITORIES} from "../../../../Repositories";
import _ from "lodash";

interface UniqueParam {
    repository: REPOSITORIES,
    property?: string,
}

export function Unique(params: UniqueParam,validationOptions?: ValidationOptions)
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
        console.log({[args.property]:value})

        // tslint:disable-next-line:no-shadowed-variable
        const [params] = args.constraints;
        // @ts-ignore
        const repository = ContainerFactory.create<any>(REPOSITORIES[params.repository]);
        const exist = await repository.exist({[args.property]:value},['_id']);

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
