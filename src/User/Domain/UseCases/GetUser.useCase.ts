import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";

export default class GetUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        return await this.repository.getOne(payload.getId());
    }
}
