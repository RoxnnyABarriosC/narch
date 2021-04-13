import ILogDomain from "../InterfaceAdapters/ILog.domain";
import BaseEntity from "../../App/Domain/Shared/Base.entity";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";
import LogActionEnum from "../Infrastructure/Enum/LogActionEnum";

export default class LogEntity extends BaseEntity implements ILogDomain
{
    action: LogActionEnum;
    entity: string;
    entityId: string;
    description: string;
    metadata: {};
    createdBy: IUserDomain;

    constructor()
    {
      super()
    }

    getCreatedBy(): IUserDomain
    {
        return this.createdBy;
    }
}
