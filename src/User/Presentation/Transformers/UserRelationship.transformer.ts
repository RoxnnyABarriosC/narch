import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import Transformer from "../../../App/Presentation/Shared/Transformer";

export default class UserRelationshipTransformer extends Transformer
{
    public transform(user: IUserDomain)
    {
        return {
            id: user.getId(),
            fullName: user.getFullName(),
            email: user.email,
        };
    }
}
