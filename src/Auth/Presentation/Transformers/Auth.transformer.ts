import moment from "moment";
import {Transformer} from "@digichanges/shared-experience";
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

        return {
            user: {
                id: token.getUser().getId(),
                firstName: token.getUser().firstName,
                lastName: token.getUser().lastName,
                email: token.getUser().email,
                enable: token.getUser().enable,
                permissions: authService.getPermissions(user),
                roles: this.roleUserTransformer.handle(token.getUser().roles),
                createdAt: moment(token.getUser().createdAt).utc().unix(),
                updatedAt: moment(token.getUser().updatedAt).utc().unix(),
            },
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}
