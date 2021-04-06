import internal from "stream";
import IFileDomain from "../IFile.domain";

export default interface IFileDTO
{
    metadata: IFileDomain;
    stream: internal.Readable;
}

