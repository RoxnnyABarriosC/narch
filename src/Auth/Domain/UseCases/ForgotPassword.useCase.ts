import Config from "config";
import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import ForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ForgotPassword.payload";
import EmailNotificationEntity from "../../../App/Infrastructure/Entities/EmailNotification.entity";
import ForgotPasswordEvent from "../../Infrastructure/Event/ForgotPassword.event";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class ForgotPasswordUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    async handle(payload: ForgotPasswordPayload)
    {
        const email: string = payload.getEmail();
        const user = await this.repository.getOneBy({email});

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAT();

        await this.repository.update(user);

        const emailNotification = new EmailNotificationEntity();

        let urlConfirmationToken: string = Config.get('url.urlWeb') + 'changeForgotPassword/' + user.confirmationToken;

        emailNotification.name = "Forgot Password";
        emailNotification.to = payload.getEmail();
        emailNotification.subject = "Forgot Password";

        this.eventExecute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, {emailNotification, urlConfirmationToken});

        return {message: "We've sent you an email"};
    }
}
