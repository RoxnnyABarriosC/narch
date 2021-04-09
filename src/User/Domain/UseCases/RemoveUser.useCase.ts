import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default class RemoveUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        return await this.repository.delete(payload.getId());
    }
}

