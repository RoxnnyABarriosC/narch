import IItemDomain from "../InterfaceAdapters/IItem.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";

export default class ItemEntity extends BaseEntity implements IItemDomain
{
    name: string;
    createdBy: IUserDomain;
    updatedBy: IUserDomain;

    constructor()
    {
      super()
    }

    getCreatedBy(): IUserDomain
    {
        return this.createdBy;
    }

    getUpdatedBy(): IUserDomain
    {
        return this.updatedBy;
    }
}
