import Transformer from "../../../App/Presentation/Shared/Transformer";
import RoleUserTransformer from "../../../Role/Presentation/Transformers/RoleUser.transformer";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import AuthService from "../../../App/Infrastructure/Services/Auth.service";
import FileTransformer from "../../../File/Presentation/Transformers/File.transformer";

export default class AuthTransformer extends Transformer
{
    private roleUserTransformer: RoleUserTransformer;
    private fileTransformer: FileTransformer;

    constructor()
    {
        super();
        this.roleUserTransformer = new RoleUserTransformer();
        this.fileTransformer = new FileTransformer();
    }

    public transform(token: IToken)
    {
        const user: IUserDomain = token.getUser();
        const authService: AuthService = new AuthService();

        return {
            user: {
                id: user.getId(),
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                enable: user.enable,
                permissions: authService.getPermissions(user),
                roles: this.validate(user.getRoles(),'roleUserTransformer'),
                mainPicture: this.validate(user.getMainPicture(),'fileTransformer'),
                createdAt: this.transformDate(user.createdAt),
                updatedAt: this.transformDate(user.updatedAt),
            },
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}
