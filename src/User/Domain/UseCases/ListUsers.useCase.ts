import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import { IPaginator} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";

export default class ListUsersUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}
