import {IsUUID} from "class-validator";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import {Request} from "express";

export default class IdRequest implements IdPayload
{
    @IsUUID("4")
    id: string;

    constructor(request: Request | any)
    {
        this.id = request.params.id;
    }

    getId(): string
    {
        return this.id;
    }
}
