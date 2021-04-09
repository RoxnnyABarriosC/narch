import {Request} from "express";
import {IsBase64, IsMimeType, IsString} from "class-validator";
import SaveFileBase64Payload from "../../InterfaceAdapters/Payloads/SaveFileBase64.payload";

export default class SaveFileBase64Request implements SaveFileBase64Payload
{
    @IsMimeType()
    mimeType: string;

    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor(request: Request | any)
    {
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
        const MIMETYPE_SIZE = 814;
        const ENCODING_INCREMENT_SIZE = 1.37;
        return Math.floor((this.base64.length - MIMETYPE_SIZE) / ENCODING_INCREMENT_SIZE)  ;
    }

    getBase64(): string
    {
        return this.base64;
    }
}

