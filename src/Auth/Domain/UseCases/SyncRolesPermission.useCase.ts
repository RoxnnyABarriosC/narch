import _ from "lodash";

import Permissions from "../../../Config/Permissions";
import Roles from "../../../Config/Roles";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import RoleEntity from "../../../Role/Domain/Role.entity";

export default class SyncRolesPermissionUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle()
    {
        const roles = Roles.getRoles();

        _.map(roles, async (value: string[], key: string) =>
        {
            let permissions = value;
            let amount = false;

            console.log(key);
            console.log(value)

            const role: IRoleDomain = await this.repository.getBy({slug: key.toLowerCase()});

            if (role)
            {
                amount = permissions.length >= role.permissions.length;
                permissions = amount ? _.union(role.permissions, permissions) : _.intersection(role.permissions, permissions);
                role.permissions = permissions;
                await this.repository.save(role);
            }
            else
            {
                const newRole: IRoleDomain = new RoleEntity();
                newRole.name = key;
                newRole.slug = key.toLowerCase();
                newRole.permissions = permissions;
                newRole.enable = true;

                await this.repository.save(newRole);
            }
        });

       return _.flatMap(Permissions.permissions());
    }
}
