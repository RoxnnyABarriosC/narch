import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../../App";

export default class BadCredentialsException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.badCredentials'), BadCredentialsException.name);
    }
}
