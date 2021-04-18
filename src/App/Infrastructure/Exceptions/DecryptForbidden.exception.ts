import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../../App";

export default class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.decryptForbidden'), DecryptForbiddenException.name);
    }
}
