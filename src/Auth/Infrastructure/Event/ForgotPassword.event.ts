import path from "path";
import Notificator from "../../../App/Infrastructure/Notifications/Notificator";

export default class ForgotPasswordEvent
{
    public static FORGOT_PASSWORD_EVENT: string = "FORGOT_PASSWORD_EVENT";

    public static forgotPasswordListener = (props: any) =>
    {
        const {emailNotification, urlConfirmationToken} = props;

        const template: string =  path.join(__dirname, "../templates/emails/forgot_password.hbs");

        Notificator
            .sendEmail(emailNotification, template, {urlConfirmationToken})
            .then((success) => success )
            .catch((error: any) => { throw Error("Error To send NotificationEntity Forgot Password") });
    }
}
