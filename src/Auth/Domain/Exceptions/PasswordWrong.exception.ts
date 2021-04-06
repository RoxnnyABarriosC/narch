import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../../App/App";

export default class PasswordWrongException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.passwordWrong'), PasswordWrongException.name);
    }
}
