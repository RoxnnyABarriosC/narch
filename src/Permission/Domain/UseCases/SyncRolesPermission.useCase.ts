import _ from "lodash";
import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import Permissions from "../../../Config/Permissions";
import Roles from "../../../Config/Roles";
import RoleEntity from "../../../Role/Domain/Role.entity";

export default class SyncRolesPermissionUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository<IRoleDomain>;

    async handle()
    {
        const roles = Roles.getRoles();

        await _.map(roles, async (value: string[], key: string) =>
        {
            let permissions: string[] = value;
            let amount: boolean = false;

            const role: IRoleDomain = await this.repository.getOneBy({slug: key.toLowerCase()}, { initThrow: false });

            if (role)
            {
                amount = permissions.length >= role.permissions.length;
                permissions = amount ? _.union(role.permissions, permissions) : _.intersection(role.permissions, permissions);
                role.permissions = permissions;
                role.ofSystem = true;
                await this.repository.save(role);
            }
            else
            {
                const newRole: IRoleDomain = new RoleEntity();
                newRole.name = key;
                newRole.slug = key.toLowerCase();
                newRole.permissions = permissions;
                newRole.enable = true;
                newRole.ofSystem = true;

                await this.repository.save(newRole);
            }
        });

       return _.flatMap(Permissions.permissions());
    }
}
