import {Request} from "express";
import IUserDomain from "../../../../User/InterfaceAdapters/IUser.domain";
import AuthUserPayload from "../../../InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default class AuthUserRequest implements AuthUserPayload
{
    authUser: IUserDomain;

    constructor(request: Request | any)
    {
        this.authUser = request.authUser;
    }

    getAuthUser(): IUserDomain
    {
        return this.authUser;
    }
}
