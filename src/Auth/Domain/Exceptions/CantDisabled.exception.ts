import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../../App/App";

export default class CantDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.cantDisabled'), CantDisabledException.name);
    }
}
