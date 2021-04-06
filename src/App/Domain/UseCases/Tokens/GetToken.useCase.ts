import {ITokenRepository} from "@digichanges/shared-experience";

import ContainerFactory from "../../../Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../../Repositories";

export default class GetTokenUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

