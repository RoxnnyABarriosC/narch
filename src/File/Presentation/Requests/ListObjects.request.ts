import {Request} from 'express';
import {IsBoolean, IsOptional} from "class-validator";
import ListObjectsPayload from "../../InterfaceAdapters/Payloads/ListObjectsPayload";

export default class ListObjectsRequest implements ListObjectsPayload
{
    @IsOptional()
    @IsBoolean()
    recursive: string;

    @IsOptional()
    @IsBoolean()
    prefix: string;

    constructor(request: Request | any)
    {
        this.recursive = request.query.recursive ? String(request.query.recursive): undefined;
        this.prefix = request.query.hasOwnProperty('prefix') ? String(request.query.prefix) : undefined;;
    }

    getRecursive(): boolean
    {
        return (this.recursive?.toLowerCase() === 'true');
    }

    getPrefix(): string
    {
        return this.prefix;
    }
}

