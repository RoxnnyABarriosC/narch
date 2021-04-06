import NotificationEntity from "./Notification.entity";

export default class EmailNotificationEntity extends NotificationEntity
{
    emailTemplatePath : string;
    senderName: string;
    from: string;
    to: string;
    cc: string;
    subject: string;
    description: string;

    constructor()
    {
        super();
        this.cc = null;
        this.description = null;
    }
}
