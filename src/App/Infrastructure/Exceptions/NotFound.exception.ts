import ErrorException from "../../Shared/ErrorException";

export default class NotFoundException extends ErrorException
{
    constructor(entity: string)
    {
        super(`${entity} Not Found`, NotFoundException.name);
    }
}
