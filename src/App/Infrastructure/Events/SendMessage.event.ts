import Notificator from "../Notifications/Notificator";

export default class SendMessageEvent
{
    public static SEND_MESSAGE_EVENT: string = "SEND_MESSAGE_EVENT";

    public static sendMessageListener = (props: any) =>
    {
        const {pushNotification, message} = props;

        Notificator
            .sendPushNotification(pushNotification, message)
            .then((success) => success )
            .catch((error: any) => { throw Error("Error To send Web Push NotificationEntity") });
    }
}
