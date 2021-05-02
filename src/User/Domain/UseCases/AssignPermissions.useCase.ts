import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import _ from "lodash";
import UserAssignPermissionsPayload from "../../InterfaceAdapters/Payloads/UserAssignPermissions.payload";
import {SERVICES} from "../../../Services";
import IAuthService from "../../InterfaceAdapters/IAuth.service";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../User.entity";
import UserLogTransformer from "../../Presentation/Transformers/UserLog.transformer";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class AssignPermissionsUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UserAssignPermissionsPayload): Promise<IUserDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        this.authService.validatePermissions(payload.getPermissions());

        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.permissions = payload.getPermissions();

        user = await this.repository.update(user);

        const logUpdateProps: ILogUpdateProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            newEntity: user,
            oldEntity: oldUser,
            description: `${authUser.email} updated the permissions`,
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return user;
    }
}
