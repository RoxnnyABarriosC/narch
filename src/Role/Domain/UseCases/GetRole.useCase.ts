import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default class GetRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        return await this.repository.getOne(payload.getId());
    }
}
