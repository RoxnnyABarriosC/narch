import {ErrorException} from "@digichanges/shared-experience";
import {Locales} from "../../../App/App";

class RoleDisabledException extends ErrorException
{
    constructor()
    {
        super(Locales.__('general.exceptions.roleDisabled'), RoleDisabledException.name);
    }
}

export default RoleDisabledException;
