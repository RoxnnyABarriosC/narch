import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";

export default interface IFileDomain extends IBaseEntityDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
}
