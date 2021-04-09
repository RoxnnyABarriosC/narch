import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import RoleTransformer from "../../../Role/Presentation/Transformers/Role.transformer";
import Transformer from "../../../App/Presentation/Shared/Transformer";

export default class UserTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
    }

    public transform(user: IUserDomain)
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            enable: user.enable,
            roles: this.validate(user?.getRoles(),'roleTransformer'),
            permissions: user.permissions,
            createdAt: this.transformDate(user.createdAt),
            updatedAt: this.transformDate(user.updatedAt),
        };
    }
}
