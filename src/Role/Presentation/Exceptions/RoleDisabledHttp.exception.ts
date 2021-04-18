import ErrorHttpException from "../../../App/Shared/ErrorHttpException";
import StatusCode from "../../../App/Presentation/Shared/StatusCode";
import {Locales} from "../../../App";

export default class RoleDisabledHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_FORBIDDEN, Locales.__('general.exceptions.roleDisabled'), []);
    }
}
