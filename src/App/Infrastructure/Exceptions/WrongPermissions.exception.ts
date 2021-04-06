import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../App";

export default class WrongPermissionsException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.wrongPermissions'), WrongPermissionsException.name);
    }
}

