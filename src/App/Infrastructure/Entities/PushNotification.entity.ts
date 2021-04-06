import webPush from "web-push";
import NotificationEntity from "./Notification.entity";

export default class PushNotificationEntity extends NotificationEntity
{
    subscription: webPush.PushSubscription;
    url: string;

    constructor()
    {
        super();
        this.url = null;
    }

    getSubscription()
    {
        return this.subscription;
    }
}
