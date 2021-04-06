import Notificator from "../../../App/Infrastructure/Notifications/Notificator";

export default class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT: string = "FORGOT_PASSWORD_EVENT";

    public static forgotPasswordListener = (props: any) =>
    {
        const {emailNotification, urlConfirmationToken} = props;

        Notificator
            .sendEmail(emailNotification, "auth/forgot_password.hbs", {urlConfirmationToken})
            .then((success) => success )
            .catch((error: any) => { throw Error("Error To send NotificationEntity Forgot Password") });
    }
}
