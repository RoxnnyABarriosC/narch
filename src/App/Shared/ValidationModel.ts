import {ValidationError} from "class-validator";

export default class ValidationModel
{
    property: string;
    constraints: object;

    constructor(errors: ValidationError)
    {
        this.property = errors.property;
        this.constraints = errors.constraints;
    }
}