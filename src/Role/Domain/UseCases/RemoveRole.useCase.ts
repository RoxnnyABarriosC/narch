import IRoleRepository from "../../InterfaceAdapters/IRole.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default class RemoveRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}
