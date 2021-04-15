import lazyInject from "../../../LazyInject";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import {SERVICES} from "../../../Services";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuth.service";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";

export default class GetMeUseCase
{
    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: AuthUserPayload): Promise<IToken>
    {
        const user: IUserDomain = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        await this.authService.addTokenBackList(tokenId)

        return await this.tokenFactory.createToken(user);
    }
}
