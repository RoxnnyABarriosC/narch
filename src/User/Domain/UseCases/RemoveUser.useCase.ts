import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";

export default class RemoveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    async handle(payload: IdPayload): Promise<any>
    {
        return await this.repository.delete(payload.getId());
    }
}

