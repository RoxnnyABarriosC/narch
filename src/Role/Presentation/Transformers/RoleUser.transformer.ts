import Transformer from "../../../App/Presentation/Shared/Transformer";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";

export default class RoleUserTransformer extends Transformer
{
    public transform(role: IRoleDomain)
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            enable: role.enable,
            createdAt: this.transformDate(role.createdAt),
            updatedAt: this.transformDate(role.updatedAt),
        };
    }
}
