import {Request} from "express";
import {IsEmail} from "class-validator";
import {IsUUID} from "class-validator";
import KeepAlivePayload from "../../InterfaceAdapters/Payloads/KeepAlive.payload";

export default class KeepAliveRequest implements KeepAlivePayload
{
    @IsEmail()
    email: string;

    @IsUUID("4")
    id: string;

    constructor(request: Request | any)
    {
        this.email = request.tokenDecode.email;
        this.id = request.tokenDecode.id;
    }

    getEmail(): string
    {
        return this.email;
    }

    getTokenId(): string
    {
        return this.id;
    }
}

