import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import DeleteRoleOfSystemException from "../../Infrastructure/Exceptions/DeleteRoleOfSystem.exception";
import SaveLogRoleUseCase from "../../../Log/Domain/UseCases/SaveLogRole.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class RemoveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const exist: any = await this.repository.exist({_id: payload.getId()}, ['ofSystem'], true);

        if (exist.ofSystem)
        {
            throw new DeleteRoleOfSystemException();
        }

        const role: IRoleDomain = await this.repository.delete(payload.getId());

        const log = new SaveLogRoleUseCase(payload.getAuthUser(), role);
        await log.handle(LogActionEnum.REMOVE);

        return role;
    }
}
