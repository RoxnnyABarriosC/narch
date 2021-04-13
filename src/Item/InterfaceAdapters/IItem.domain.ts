import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";

export default interface IItemDomain extends IBaseEntityDomain
{
    name: string;
    createdBy: IUserDomain;
    updatedBy: IUserDomain;

    getCreatedBy(): IUserDomain;
    getUpdatedBy(): IUserDomain;
}
