import {Request} from "express";
import {IsDefined} from "class-validator";
import SaveFileMultipartPayload from "../../InterfaceAdapters/Payloads/SaveFileMultipart.payload";

export default class SaveFileMultipartRequest implements SaveFileMultipartPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(request: Request | any)
    {
        this.file = request.file;
    }

    getName(): string
    {
        return this.file.filename.split(".").shift();
    }

    getOriginalName(): string
    {
        return this.file.originalname;
    }

    getMimeType(): string
    {
        return this.file.mimetype;
    }

    getPath(): string
    {
        return "/";
    }

    getExtension(): string
    {
        return this.file.originalname.split(".").pop();
    }

    getSize(): number
    {
        return this.file.size;
    }

    getFile(): Express.Multer.File
    {
        return this.file;
    }
}
