import {injectable} from "inversify";
import _ from "lodash";

import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import IUserService from "../../InterfaceAdapters/IServices/IUser.service";
import CheckUserRolePayload from "../../../User/InterfaceAdapters/Payloads/CheckUserRole.payload";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";

@injectable()
export default class UserService implements IUserService
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    public async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        _.map(payload.user.getRoles(), async (role: IRoleDomain) => {
            const exist = await this.roleRepository.exist({_id: role.getId()}, ['slug'] );
            if(exist.slug === payload.roleToCheck)
            {
                return true;
            }
        });

        return false;
    }
}
