import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default class RemoveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        return await this.repository.delete(payload.getId());
    }
}
