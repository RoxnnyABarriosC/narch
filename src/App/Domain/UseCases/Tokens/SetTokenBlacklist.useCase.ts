import {ITokenRepository} from "@digichanges/shared-experience";


import ContainerFactory from "../../../Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../../Repositories";
import ITokenDomain from "../../../InterfaceAdapters/IInfraestructure/ITokenDomain";

export default class SetTokenBlacklistUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}
