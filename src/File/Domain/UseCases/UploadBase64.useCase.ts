import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";
import SaveFileBase64Payload from "../../InterfaceAdapters/Payloads/SaveFileBase64.payload";
import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import FileEntity from "../File.entity";

export default class UploadBase64UseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository<IFileDomain>;

    async handle(payload: SaveFileBase64Payload): Promise<IFileDomain>
    {
        let file: IFileDomain = new FileEntity();

        file.extension = payload.getExtension();
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        file = await this.repository.save(file);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }
}
