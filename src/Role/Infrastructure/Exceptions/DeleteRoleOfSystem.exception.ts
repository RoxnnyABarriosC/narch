import {Locales} from "../../../App/App";
import ErrorException from "../../../App/Shared/ErrorException";

export default class DeleteRoleOfSystemException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.deleteRoleOfSystem'), DeleteRoleOfSystemException.name);
    }
}
