import lazyInject from "../../../LazyInject";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import KeepAlivePayload from "../../InterfaceAdapters/Payloads/KeepAlive.payload";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import {SERVICES} from "../../../Services";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";

export default class KeepAliveUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: KeepAlivePayload): Promise<IToken>
    {
        const user: IUserDomain = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        await this.authService.addTokenBackList(tokenId)

        return await this.tokenFactory.createToken(user);
    }
}
