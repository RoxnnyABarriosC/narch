import ErrorException from "../../../App/Shared/ErrorException";
import {Locales} from "../../../App/App";

export default class UserDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.userDisabled'), UserDisabledException.name);
    }
}
