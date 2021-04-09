import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";
import IPaginator from "../../../App/InterfaceAdapters/Shared/IPaginator";

export default class ListFilesUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}
