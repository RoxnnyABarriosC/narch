import {Request} from "express";
import {IsArray, IsBoolean, IsOptional, IsString} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UpdateITemPayload from "../../InterfaceAdapters/Payloads/UpdateITem.payload";

export default class UpdateItemRequest extends IdRequest implements UpdateITemPayload
{
    @IsString()
    name: string;

    constructor(request: Request | any)
    {
        super(request);
        this.name = request.body.name;
    }

    getName(): string
    {
        return this.name;
    }
}
