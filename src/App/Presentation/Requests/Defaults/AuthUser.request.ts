import {Request} from "express";
import IUserDomain from "../../../../User/InterfaceAdapters/IUser.domain";
import AuthUserPayload from "../../../InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default class AuthUserRequest implements AuthUserPayload
{
    authUser: IUserDomain;
    tokenId: string;

    constructor(request: Request | any)
    {
        this.authUser = request.authUser;
        this.tokenId = request.tokenDecode.id;
    }

    getAuthUser(): IUserDomain
    {
        return this.authUser;
    }

    getTokenId(): string
    {
        return this.tokenId;
    }
}
