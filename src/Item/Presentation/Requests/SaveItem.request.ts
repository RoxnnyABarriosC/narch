import {Request} from "express";
import {IsOptional, IsString, IsUUID, Length} from "class-validator";
import SaveItemPayload from "../../InterfaceAdapters/Payloads/SaveItem.payload";
import AuthUserRequest from "../../../App/Presentation/Requests/Defaults/AuthUser.request";

export default class SaveItemRequest extends AuthUserRequest implements SaveItemPayload
{
    @IsOptional()
    @IsString()
    @IsUUID('4')
    id: string

    @Length(3, 30)
    @IsString()
    name: string;

    constructor(request: Request | any)
    {
        super(request);
        this.id = request.body.id;
        this.name = request.body.name;
    }

    getId(): string
    {
        return this.id;
    }

    getName(): string
    {
        return this.name;
    }
}
