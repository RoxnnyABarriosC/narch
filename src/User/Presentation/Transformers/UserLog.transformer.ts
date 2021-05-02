import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import Transformer from "../../../App/Presentation/Shared/Transformer";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import IFileDomain from "../../../File/InterfaceAdapters/IFile.domain";

export default class UserLogTransformer extends Transformer
{
    public transform(user: IUserDomain)
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            enable: user.enable,
            permissions: user.permissions,
            roles: this.getIds<IRoleDomain[]>(user?.getRoles()),
            mainPicture: this.getIds<IFileDomain>(user?.getMainPicture()),
        };
    }
}
