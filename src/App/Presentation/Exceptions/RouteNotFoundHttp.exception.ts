import ErrorHttpException from "../../Shared/ErrorHttpException";
import StatusCode from "../Shared/StatusCode";
import {Locales} from "../../App";

export default class RouteNotFoundHttpException extends ErrorHttpException
{
    constructor()
    {
        super(StatusCode.HTTP_NOT_FOUND, Locales.__('general.exceptions.routeNotFound'), []);
    }
}
