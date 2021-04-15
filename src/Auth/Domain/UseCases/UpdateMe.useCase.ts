import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IAuthService from "../../../App/InterfaceAdapters/IServices/IAuth.service";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import UpdateMePayload from "../../InterfaceAdapters/Payloads/UpdateMe.payload";

export default class UpdateMeUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: UpdateMePayload): Promise<IToken>
    {
        let user: IUserDomain = payload.getAuthUser();
        const tokenId: string = payload.getTokenId();

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();

        user = await this.repository.save(user);

        await this.authService.addTokenBackList(tokenId)

        return this.tokenFactory.createToken(user);
    }
}
