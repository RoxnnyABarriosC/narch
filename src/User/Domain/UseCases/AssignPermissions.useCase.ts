import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import _ from "lodash";
import SaveLogUserUseCase from "../../../Log/Domain/UseCases/SaveLogUser.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";
import UserAssignPermissionsPayload from "../../InterfaceAdapters/Payloads/UserAssignPermissions.payload";
import {SERVICES} from "../../../Services";
import IAuthService from "../../InterfaceAdapters/IAuth.service";

export default class AssignPermissionsUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UserAssignPermissionsPayload): Promise<IUserDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.permissions = payload.getPermissions();

        const log = new SaveLogUserUseCase(payload.getAuthUser(), oldUser);
        await log.handle(LogActionEnum.UPDATE);

        return await this.repository.save(user);
    }
}
