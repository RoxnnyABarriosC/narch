import * as express from 'express';
import { IsDefined } from 'class-validator';
import IdRequest from "../../../App/Presentation/Requests/Defaults/Id.request";
import UpdateFileMultipartPayload from "../../InterfaceAdapters/Payloads/UpdateFileMultipart.payload";

class UpdateFileMultipartRequest extends IdRequest implements UpdateFileMultipartPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(request: express.Request)
    {
        super(request)
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

    getFile(): Express.Multer.File
    {
        return this.file;
    }

    getSize(): number
    {
        return this.file.size;
    }
}

export default UpdateFileMultipartRequest;
