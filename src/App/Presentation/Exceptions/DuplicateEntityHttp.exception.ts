import ErrorHttpException from "../../Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";
import {Locales} from "../../../App";

export default class DuplicateEntityHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_UNPROCESSABLE_ENTITY, Locales.__('general.exceptions.duplicateEntity'), []);
    }
}
