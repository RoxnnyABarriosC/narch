import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import UpdateFileMultipartPayload from "../../InterfaceAdapters/Payloads/UpdateFileMultipart.payload";
import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";

export default class UpdateFileMultipartUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository<IFileDomain>;

    async handle(payload: UpdateFileMultipartPayload): Promise<IFileDomain>
    {
        let file: IFileDomain = await this.repository.getOne(payload.getId());

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();
        file.version += 1;

        file = await this.repository.save(file);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;        
    }
}

