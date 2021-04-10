import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import UserAssignRolePayload from "../../InterfaceAdapters/Payloads/UserAssignRole.payload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";

export default class AssignRoleUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        let user: IUserDomain = await this.repository.getOne(payload.getId());

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        return await this.repository.save(user);
    }
}
