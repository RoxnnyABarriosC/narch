import lazyInject from "../../../../LazyInject";
import {REPOSITORIES} from "../../../../Repositories";
import {ITokenRepository} from "@digichanges/shared-experience";

export default class GetTokenUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    async handle(id: string)
    {
        return await this.repository.getOne(id);
    }
}

