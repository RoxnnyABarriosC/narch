import lazyInject from "../../../../LazyInject";
import {REPOSITORIES} from "../../../../Repositories";
import {ITokenRepository} from "@digichanges/shared-experience";
import GetTokenUseCase from "./GetToken.useCase";
import TokenEntity from "../../../Infrastructure/Entities/Token.entity";
import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttp.exception";

export default class VerifyTokenBlacklistUseCase
{
    @lazyInject(REPOSITORIES.ITokenRepository)
    private repository: ITokenRepository;

    async handle(tokenId: string)
    {
        const getTokenUseCase = new GetTokenUseCase();
        const tokenSaved: TokenEntity = await getTokenUseCase.handle(tokenId);

        if (tokenSaved.blackListed)
        {
            throw new TokenBlackListedHttpException();
        }

        return tokenSaved;
    }
}
