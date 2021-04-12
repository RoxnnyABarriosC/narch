import INotificationDomain from "../../InterfaceAdapters/IInfraestructure/INotification.domain";
import BaseEntity from "../../Domain/Shared/Base.entity";

export default class NotificationEntity extends BaseEntity implements INotificationDomain
{
    name: string;

    constructor()
    {
        super()
    }
}
