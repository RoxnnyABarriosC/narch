import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import {ITokenRepository} from "@digichanges/shared-experience";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import KeepAlivePayload from "../../InterfaceAdapters/Payloads/KeepAlive.payload";
import SetTokenBlacklistUseCase from "../../../App/Domain/UseCases/Tokens/SetTokenBlacklist.useCase";

export default class KeepAliveUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @lazyInject(REPOSITORIES.ITokenRepository)
    private tokenRepository: ITokenRepository;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: KeepAlivePayload)
    {
        const email = payload.getEmail();
        const tokenId = payload.getTokenId()

        const user = await this.repository.getOneBy({email});
        const token: any = await this.tokenRepository.getOne(tokenId);

        const setTokenBlacklistUseCase = new SetTokenBlacklistUseCase();
        await setTokenBlacklistUseCase.handle(token);

        return await this.tokenFactory.createToken(user);
    }
}
