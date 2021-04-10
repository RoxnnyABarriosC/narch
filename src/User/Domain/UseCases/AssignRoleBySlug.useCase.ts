import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import UserAssignRoleByPayload from "../../InterfaceAdapters/Payloads/UserAssignRoleBy.payload";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";

export default class AssignRoleBySlugUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        const email = payload.getEmail();
        const slug = payload.getSlugRole();

        let user: IUserDomain = await this.repository.getOneBy({email});
        let role: IRoleDomain = await this.roleRepository.getOneBy({slug});

        user.setRole(role);

        return await this.repository.save(user);
    }
}
