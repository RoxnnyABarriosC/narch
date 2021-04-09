import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import Transformer from "../../../App/Presentation/Shared/Transformer";

export default class FileTransformer extends Transformer
{
    transform(file: IFileDomain)
    {
        return {
            id: file.getId(),
            name: file.name,
            originalName: file.originalName,
            extension: file.extension,
            path: file.path,
            mimeType: file.mimeType,
            size: file.size,
            version: file.version,
            createdAt: this.transformDate(file.createdAt),
            updatedAt: this.transformDate(file.updatedAt),
        };
    }    
}
