import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IFileDTO from "../../InterfaceAdapters/IDto/IFileDTO";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";
import IFileDomain from "../../InterfaceAdapters/IFile.domain";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import FileDto from "../../InterfaceAdapters/Payloads/Dto/File.dto";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";

export default class DownloadUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository<IFileDomain>;

    async handle(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata: IFileDomain = await this.repository.getOne(id);

        const filesystem = FilesystemFactory.create();
        const stream = await filesystem.downloadStreamFile(id);

        return new FileDto(metadata, stream);
    }
}
