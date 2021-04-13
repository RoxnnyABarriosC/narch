import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";

export default class GetLogUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    async handle(payload: IdPayload): Promise<ILogDomain>
    {
        return await this.repository.getOne(payload.getId());
    }
}
