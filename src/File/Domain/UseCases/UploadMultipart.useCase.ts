import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import FileEntity from "../File.entity";
import SaveFileMultipartPayload from "../../InterfaceAdapters/Payloads/SaveFileMultipart.payload";
import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";


export default class UploadMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: SaveFileMultipartPayload): Promise<IFileDomain>
    {
        let file: IFileDomain = new FileEntity();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        file = await this.repository.save(file);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}
