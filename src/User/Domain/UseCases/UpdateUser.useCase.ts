import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuthService";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import UpdateUserPayload from "../../InterfaceAdapters/Payloads/UpdateUser.payload";
import CheckUserRolePayload from "../../InterfaceAdapters/Payloads/CheckUserRole.payload";
import Roles from "../../../Config/Roles";
import CantDisabledException from "../../../Auth/Domain/Exceptions/CantDisabled.exception";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";

export default class UpdateUserUseCase
{
    private repository: IUserRepository;
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

    async handle(payload: UpdateUserPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);
        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        if(typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            let checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            }

            const verifyRole = await this.checkIfUserHasRole(checkRole);

            if(verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.enable = payload.getEnable();
        user.email = payload.getEmail();
        user.permissions = payload.getPermissions();

        await this.repository.save(user);

        return user;
    }

    public async checkIfUserHasRole (payload: CheckUserRolePayload): Promise<boolean> // TODO: Create a user service
    {
        let roleRepository: IRoleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        let count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await roleRepository.getOne(payload.user.roles[i].getId());

            if(role.slug === payload.roleToCheck)
            {
                return true;
            }
        }

        return false;
    }
}
