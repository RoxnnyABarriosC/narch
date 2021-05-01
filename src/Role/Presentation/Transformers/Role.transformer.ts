import Transformer from "../../../App/Presentation/Shared/Transformer";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";

export default class RoleTransformer extends Transformer
{
    public transform(role: IRoleDomain)
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            permissions: role.permissions ? role.permissions : null,
            enable: role.enable,
            createdAt: this.unixDate(role.createdAt),
            updatedAt: this.unixDate(role.updatedAt),
        };
    }
}
