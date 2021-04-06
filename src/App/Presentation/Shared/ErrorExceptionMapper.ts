import ExceptionFactory from "../../Infrastructure/Factories/Exception.factory";

export default class ErrorExceptionMapper
{
    static handle(err: any)
    {
        const exceptionFactory = new ExceptionFactory();

        return exceptionFactory.getException(err);
    }
}
