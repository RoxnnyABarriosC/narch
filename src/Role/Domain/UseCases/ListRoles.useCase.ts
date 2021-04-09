import lazyInject from "../../../LazyInject";
import {IPaginator} from "@digichanges/shared-experience";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import ICriteria from "../../../App/InterfaceAdapters/Shared/ICriteria";

export default class ListRolesUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}
