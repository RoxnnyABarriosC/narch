import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import UserAssignRoleByPayload from "../../InterfaceAdapters/Payloads/UserAssignRoleBy.payload";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";

export default class AssignRoleBySlugUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        const email = payload.getEmail();
        const slug = payload.getSlugRole();

        let user: IUserDomain = await this.repository.getOneBy({email});
        let role: IRoleDomain = await this.roleRepository.getBy({slug});

        user.setRole(role);

        return await this.repository.save(user);
    }
}
