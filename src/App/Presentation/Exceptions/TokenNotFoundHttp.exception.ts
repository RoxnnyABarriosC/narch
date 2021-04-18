import ErrorHttpException from "../../Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";
import {Locales} from "../../../App";

export default class TokenNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.tokenNotFound'), []);
    }
}

