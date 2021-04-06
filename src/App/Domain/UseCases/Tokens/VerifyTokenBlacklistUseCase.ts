import {ITokenRepository} from "@digichanges/shared-experience";

import GetTokenUseCase from "./GetToken.useCase";

import ContainerFactory from "../../../Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../../Repositories";
import TokenEntity from "../../../Infrastructure/Entities/Token.entity";
import TokenBlackListedHttpException from "../../../Presentation/Exceptions/TokenBlackListedHttp.exception";

export default class VerifyTokenBlacklistUseCase
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository);
    }

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
