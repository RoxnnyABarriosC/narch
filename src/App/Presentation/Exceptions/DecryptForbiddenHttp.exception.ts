import {Locales} from "../../../App";
import ErrorHttpException from "../../Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";

export default class DecryptForbiddenHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.decryptForbidden'), []);
    }
}

