import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import UserAssignRolesPayload from "../../InterfaceAdapters/Payloads/UserAssignRoles.payload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import _ from "lodash";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../User.entity";
import UserLogTransformer from "../../Presentation/Transformers/UserLog.transformer";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class AssignRolesUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    async handle(payload: UserAssignRolesPayload): Promise<IUserDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        user = await this.repository.update(user);

        const logUpdateProps: ILogUpdateProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            newEntity: user,
            oldEntity: oldUser,
            description: `${authUser.email} updated the roles`,
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return user;
    }
}
