import lazyInject from "../../../../LazyInject";
import {REPOSITORIES} from "../../../../Repositories";
import {ITokenRepository} from "@digichanges/shared-experience";
import ITokenDomain from "../../../InterfaceAdapters/IInfraestructure/ITokenDomain";

export default class SetTokenBlacklistUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    async handle(token: ITokenDomain)
    {
        token.blackListed = true;
        await this.repository.save(token);
    }
}
