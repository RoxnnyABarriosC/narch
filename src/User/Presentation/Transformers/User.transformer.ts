import moment from "moment";
import {Transformer} from "@digichanges/shared-experience";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import RoleTransformer from "../../../Role/Presentation/Transformers/Role.transformer";

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
            roles: this.roleTransformer.handle(user.getRoles()),
            permissions: user.permissions,
            createdAt: moment(user.createdAt).utc().unix(),
            updatedAt: moment(user.updatedAt).utc().unix(),
        };
    }
}
