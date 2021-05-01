import Transformer from "../../../App/Presentation/Shared/Transformer";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";

export default class ItemLogTransformer extends Transformer
{
    public transform(item: IItemDomain)
    {
        return {
            id: item.getId(),
            name: item.name,
            createdBy: this.getIds(item?.getCreatedBy()),
            updatedBy: this.getIds(item?.getUpdatedBy()),
        };
    }
}
