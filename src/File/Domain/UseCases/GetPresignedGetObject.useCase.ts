import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import SavePresignedFilePayload from "../../InterfaceAdapters/Payloads/SavePresignedFile.payload";
import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";

export default class GetPresignedGetObjectUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: SavePresignedFilePayload): Promise<string>
    {
        const filename = payload.getName();
        const expiry = payload.getExpiry();

        const file: IFileDomain = await this.repository.getOne(filename);

        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        const filesystem = FilesystemFactory.create();
        return await filesystem.presignedGetObject(filename, expiry, metadata);
    }
}

