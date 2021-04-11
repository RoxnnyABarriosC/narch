import IFileDomain from "../InterfaceAdapters/IFile.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";

export default class FileEntity extends BaseEntity implements IFileDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;

    constructor()
    {
        super()
        this.name = this._id;
        this.version = 1;
    }

}
