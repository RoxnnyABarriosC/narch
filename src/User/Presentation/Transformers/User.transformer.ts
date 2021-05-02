import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import RoleTransformer from "../../../Role/Presentation/Transformers/Role.transformer";
import Transformer from "../../../App/Presentation/Shared/Transformer";
import FileTransformer from "../../../File/Presentation/Transformers/File.transformer";

export default class UserTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;
    private fileTransformer: FileTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
        this.fileTransformer = new FileTransformer();
    }

    public transform(user: IUserDomain)
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            enable: user.enable,
            permissions: user.permissions,
            roles: this.validate(user?.getRoles(),'roleTransformer'),
            mainPicture: this.validate(user?.getMainPicture(),'fileTransformer'),
            createdAt: this.unixDate(user.createdAt),
            updatedAt: this.unixDate(user.updatedAt),
        };
    }
}
