import {IsUUID} from "class-validator";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/Id.payload";
import {Request} from "express";
import AuthUserRequest from "./AuthUser.request";

export default class IdRequest extends AuthUserRequest implements IdPayload
{
    @IsUUID("4")
    id: string;

    constructor(request: Request | any)
    {
        super(request);
        this.id = request.params.id;
    }

    getId(): string
    {
        return this.id;
    }
}
