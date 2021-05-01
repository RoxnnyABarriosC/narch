import Transformer from "../../../App/Presentation/Shared/Transformer";
import IRoleDomain from "../../InterfaceAdapters/IRole.domain";

export default class RoleLogTransformer extends Transformer
{
    public transform(role: IRoleDomain)
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            permissions: this.validate(role?.permissions),
            enable: role.enable,
        };
    }
}
