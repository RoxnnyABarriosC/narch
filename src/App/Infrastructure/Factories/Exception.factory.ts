import DecryptForbiddenHttpException from "../../Presentation/Exceptions/DecryptForbiddenHttp.exception";
import BadCredentialsHttpException from "../../../Auth/Presentation/Exceptions/BadCredentialsHttp.exception";
import UserDisabledHttpException from "../../../User/Presentation/Exceptions/UserDisabledHttp.exception";
import RoleDisabledHttpException from "../../../Role/Presentation/Exceptions/RoleDisabledHttp.exception";
import CantDisabledHttpException from "../../../Auth/Presentation/Exceptions/CantDisabledHttp.exception";
import PasswordWrongHttpException from "../../../Auth/Presentation/Exceptions/PasswordWrongHttpException";
import WrongPermissionsHttpException from "../../Presentation/Exceptions/WrongPermissionsHttp.exception";
import ErrorHttpException from "../../Shared/ErrorHttpException";
import StatusCode from "../../Presentation/Shared/StatusCode";
import NotFoundHttpException from "../../Presentation/Exceptions/NotFoundHttp.exception";
import TokenExpiredHttpException from "../../Presentation/Exceptions/TokenExpiredHttp.exception";
import DuplicateEntityHttpException from "../../Presentation/Exceptions/DuplicateEntityHttp.exception";

export default class ExceptionFactory
{
    private exceptionsMapper: any = {
        'DecryptForbiddenException': new DecryptForbiddenHttpException(),
        'BadCredentialsException': new BadCredentialsHttpException(),
        'UserDisabledException': new UserDisabledHttpException(),
        'RoleDisabledException': new RoleDisabledHttpException(),
        'CantDisabledException': new CantDisabledHttpException(),
        'PasswordWrongException': new PasswordWrongHttpException(),
        'NotFoundException': new NotFoundHttpException(),
        'WrongPermissionsException': new WrongPermissionsHttpException(),
        'Error': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
        'TypeError': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
        'ErrorHttpException': new ErrorHttpException(StatusCode.HTTP_INTERNAL_SERVER_ERROR, "Internal Error", []),
    };

    public getException(err: any): ErrorHttpException
    {
        let exception = this.exceptionsMapper[err?.name || 'Error'];

        const message = err?.message || exception?.message;

        if(err instanceof Error && err.message === "Token expired")
        {
            exception = new TokenExpiredHttpException();
        }
        else if (err?.name === "MongoError")
        {
            if (err.code === 11000)
            {
                exception = new DuplicateEntityHttpException();
            }
        }
        else if (err instanceof ErrorHttpException)
        {
            exception.statusCode = err.statusCode;
            exception.message = err.message;
            exception.errors = err.errors;
        }
        else if(!exception)
        {
            exception = this.exceptionsMapper.ErrorHttpException;
        }

        exception.message = message;

        return exception;
    }
}
