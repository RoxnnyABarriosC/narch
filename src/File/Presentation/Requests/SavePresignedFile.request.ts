import * as express from 'express';
import {IsOptional, IsString} from "class-validator";
import SavePresignedFilePayload from "../../InterfaceAdapters/Payloads/SavePresignedFile.payload";

export default class SavePresignedFileRequest implements SavePresignedFilePayload
{
    @IsString()
    filename: string;

    @IsOptional()
    @IsString()
    expiry: number;

    constructor(request: express.Request)
    {
        this.filename = request.body.filename;
        this.expiry = request.body.expiry;
    }

    getName(): string
    {
        return this.filename;
    }

    getExpiry(): number
    {
        return this.expiry || 60 * 24 * 24 * 7;
    }
}
