import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import IPaginator from "../../../App/InterfaceAdapters/Shared/IPaginator";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";

export default class ListLogsUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}
