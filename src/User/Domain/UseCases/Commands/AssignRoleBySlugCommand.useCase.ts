import lazyInject from "../../../../LazyInject";
import {REPOSITORIES} from "../../../../Repositories";
import IUserRepository from "../../../InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../InterfaceAdapters/IUser.domain";
import IRoleRepository from "../../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../../Role/InterfaceAdapters/IRole.domain";
import AssignRoleBySlugCommandPayload from "../../../InterfaceAdapters/Payloads/Commands/AssignRoleBySlugCommand.payload";

export default class AssignRoleBySlugCommandUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    async handle(payload: AssignRoleBySlugCommandPayload): Promise<IUserDomain>
    {
        const email = payload.getEmail();
        const slug = payload.getSlugRole();

        let user: IUserDomain = await this.repository.getOneBy({email});
        let role: IRoleDomain = await this.roleRepository.getOneBy({slug});

        user.setRole(role);

        return await this.repository.save(user);
    }
}
