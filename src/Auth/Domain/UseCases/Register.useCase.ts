import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import {IEncryption} from "@digichanges/shared-experience";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import EventHandler from "../../../App/Infrastructure/Events/EventHandler";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import UserEntity from "../../../User/Domain/User.entity";
import UserCreatedEvent from "../../../User/Infrastructure/Event/UserCreated.event";
import RegisterPayload from "../../InterfaceAdapters/Payloads/Register.payload";
import IRoleRepository from "../../../Role/InterfaceAdapters/IRole.repository";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import _ from "lodash";
import TokenFactory from "../../../App/Infrastructure/Factories/Token.factory";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";

export default class RegisterUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository<IRoleDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    private encryption: IEncryption;

    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: RegisterPayload): Promise<IToken>
    {
        let user: IUserDomain = new UserEntity();

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.email = payload.getEmail();
        user.password = await this.encryption.encrypt(payload.getPassword());
        user.enable = payload.getEnable();
        user.permissions = payload.getPermissions();

        user.roles = [];

        await _.map(payload.getRoles(), async (slug: string) => user.roles.push(await this.roleRepository.getOneBy({slug})));

        user.isSuperAdmin = payload.getIsSuperAdmin();

        user = await this.repository.save(user);

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(UserCreatedEvent.USER_CREATED_EVENT, {email: user.email});

        return this.tokenFactory.createToken(user);
    }
}
