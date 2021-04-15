import {Request} from "express";
import KeepAlivePayload from "../../InterfaceAdapters/Payloads/KeepAlive.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";

export default class KeepAliveRequest extends  AuthUserRequest implements KeepAlivePayload
{
    constructor(request: Request | any)
    {
        super(request);
    }
}

