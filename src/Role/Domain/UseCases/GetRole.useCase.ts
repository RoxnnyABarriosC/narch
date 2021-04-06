import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import {REPOSITORIES} from "../../../Repositories";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}
