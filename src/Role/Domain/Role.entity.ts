import IRoleDomain from "../InterfaceAdapters/IRole.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";

export default class RoleEntity  extends BaseEntity  implements IRoleDomain
{
    name: string;
    slug: string;
    enable: boolean;
    ofSystem: boolean;
    permissions: string[];

    constructor()
    {
       super()
    }
}
