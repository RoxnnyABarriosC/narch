import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import UserAssignRolesPayload from "../../InterfaceAdapters/Payloads/UserAssignRoles.payload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import _ from "lodash";
import SaveLogUserUseCase from "../../../Log/Domain/UseCases/SaveLogUser.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class AssignRolesUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    async handle(payload: UserAssignRolesPayload): Promise<IUserDomain>
    {
        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        const log = new SaveLogUserUseCase(payload.getAuthUser(), oldUser);
        await log.handle(LogActionEnum.UPDATE);

        return await this.repository.save(user);
    }
}
