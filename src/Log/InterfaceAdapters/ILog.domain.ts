import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";
import LogActionEnum from "../Infrastructure/Enum/LogActionEnum";

export default interface ILogDomain extends IBaseEntityDomain
{
    type: string;
    action: LogActionEnum;
    entity: string;
    entityId: string;
    parentId: string;
    description: string;
    metadata: {};
    createdBy: IUserDomain;

    getCreatedBy(): IUserDomain;
}
