import IBaseEntityDomain from "../../App/InterfaceAdapters/Shared/IBaseEntityDomain";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";
import LogActionEnum from "../Infrastructure/Enum/LogActionEnum";

export default interface ILogDomain extends IBaseEntityDomain
{
    action: LogActionEnum;
    entity: string;
    entityId: string;
    description: string;
    metadata: {};
    createdBy: IUserDomain;

    getCreatedBy(): IUserDomain;
}
