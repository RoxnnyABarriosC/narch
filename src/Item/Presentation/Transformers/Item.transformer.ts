import Transformer from "../../../App/Presentation/Shared/Transformer";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UserRelationshipTransformer from "../../../User/Presentation/Transformers/UserRelationship.transformer";

export default class ItemTransformer extends Transformer
{
    private userRelationshipTransformer: UserRelationshipTransformer;

    constructor()
    {
        super();
        this.userRelationshipTransformer = new UserRelationshipTransformer();
    }

    public transform(role: IItemDomain)
    {
        return {
            id: role.getId(),
            name: role.name,
            createdBy: this.validate(role.getCreatedBy(),'userRelationshipTransformer'),
            lastModifiedBy: this.validate(role.getLastModifiedBy(),'userRelationshipTransformer'),
            createdAt: this.transformDate(role.createdAt),
            updatedAt: this.transformDate(role.updatedAt),
        };
    }
}
