import { v4 as uuidv4 } from 'uuid';
import IFileDomain from "../InterfaceAdapters/IFile.domain";

export default class FileEntity implements IFileDomain
{
    _id: string;
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
        this.name = this._id;
        this.version = 1;
    }

    getId(): string
    {
        return this._id;
    }
}
