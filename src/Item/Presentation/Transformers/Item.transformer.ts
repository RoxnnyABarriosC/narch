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

    public transform(item: IItemDomain)
    {
        return {
            id: item.getId(),
            name: item.name,
            createdBy: this.validate(item.getCreatedBy(),'userRelationshipTransformer'),
            updatedBy: this.validate(item.getUpdatedBy(),'userRelationshipTransformer'),
            createdAt: this.unixDate(item.createdAt),
            updatedAt: this.unixDate(item.updatedAt),
        };
    }
}
