import {Request} from "express";
import {IsBase64, IsMimeType, IsString} from "class-validator";
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UpdateFileBase64Payload from "../../InterfaceAdapters/Payloads/UpdateFileBase64.payload";

export default class UpdateFileBase64Request extends IdRequest implements UpdateFileBase64Payload
{
    @IsMimeType()
    mimeType: string;

    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor(request: Request | any)
    {
        super(request);
        this.filename = request.body.filename;
        this.base64 = request.body.base64.split(";base64,").pop();
        this.mimeType = request.body.base64.split(";base64").shift().split("data:").pop();
    }

    getName(): string
    {
        return this.filename.split(".").shift();
    }

    getOriginalName(): string
    {
        return this.filename;
    }

    getMimeType(): string
    {
        return this.mimeType;
    }

    getPath(): string
    {
        return "/";
    }

    getExtension(): string
    {
        return this.filename.split(".").pop();
    }

    getSize(): number
    {
        return Math.round((this.base64.length - 814) / 1.37)  ;
    }

    getBase64(): string
    {
        return this.base64;
    }
}
