export default class ErrorException extends Error
{
    private metadata: {} = {};

    constructor(message: string, name = ErrorException.name, metadata: {} = {})
    {
        super();
        this.message = message;
        this.name = name;
        this.metadata = metadata;
    }
}
