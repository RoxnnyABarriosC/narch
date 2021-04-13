import Transformer from "../../../App/Presentation/Shared/Transformer";
import RoleUserTransformer from "../../../Role/Presentation/Transformers/RoleUser.transformer";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import AuthService from "../../../App/Infrastructure/Services/Auth.service";

export default class AuthTransformer extends Transformer
{
    private roleUserTransformer: RoleUserTransformer;

    constructor()
    {
        super();
        this.roleUserTransformer = new RoleUserTransformer();
    }

    public transform(token: IToken)
    {
        const user: IUserDomain = token.getUser();
        const authService: AuthService = new AuthService();

        console.log(user);

        return {
            user: {
                id: user.getId(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                enable: user.enable,
                permissions: authService.getPermissions(user),
                roles: this.validate(user.getRoles(),'roleUserTransformer'),
                createdAt: this.transformDate(user.createdAt),
                updatedAt: this.transformDate(user.updatedAt),
            },
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}
