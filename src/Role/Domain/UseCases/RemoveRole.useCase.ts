import lazyInject from "../../../LazyInject";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import DeleteRoleOfSystemException from "../../Infrastructure/Exceptions/DeleteRoleOfSystem.exception";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import {ILogRemoveProps} from "../../../App/Infrastructure/Logger/Logger";
import RoleEntity from "../Role.entity";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import RoleLogTransformer from "../../Presentation/Transformers/RoleLog.transformer";

export default class RemoveRoleUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        const exist: any = await this.repository.exist({_id: payload.getId()}, ['ofSystem'], true);

        if (exist.ofSystem)
        {
            throw new DeleteRoleOfSystemException();
        }

        const role: IRoleDomain = await this.repository.delete(payload.getId());

        const logRemoveProps: ILogRemoveProps = {
            type: RoleEntity.name,
            entity: RoleEntity.name,
            entityId: role.getId(),
            removeEntity: role,
            transformer: new RoleLogTransformer(),
            authUser,
        }

        this.logRemove(logRemoveProps)


        return role;
    }
}
