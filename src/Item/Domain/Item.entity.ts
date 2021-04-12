import IItemDomain from "../InterfaceAdapters/IItem.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";

export default class ItemEntity extends BaseEntity implements IItemDomain
{
    name: string;
    createdBy: IUserDomain | string;
    lastModifiedBy: IUserDomain | string;

    constructor()
    {
      super()
    }

    getCreatedBy(): IUserDomain | string
    {
        return this.createdBy;
    }

    getLastModifiedBy(): IUserDomain | string
    {
        return this.lastModifiedBy;
    }
}
