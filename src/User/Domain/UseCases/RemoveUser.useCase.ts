import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import SaveLogUserUseCase from "../../../Log/Domain/UseCases/SaveLogUser.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class RemoveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.repository.delete(payload.getId());

        const log = new SaveLogUserUseCase(payload.getAuthUser(),user);
        await log.handle(LogActionEnum.REMOVE);

        return user;
    }
}

