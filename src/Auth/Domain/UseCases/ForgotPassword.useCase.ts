import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import ForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ForgotPassword.payload";
import EmailNotificationEntity from "../../../App/Infrastructure/Entities/EmailNotification.entity";
import Config from "config";
import EventHandler from "../../../App/Infrastructure/Events/EventHandler";
import ForgotPasswordEvent from "../../Infrastructure/Event/ForgotPassword.event";

export default class ForgotPasswordUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ForgotPasswordPayload)
    {
        const email: string = payload.getEmail();
        const user = await this.repository.getOneBy({email});

        user.confirmationToken = String(await payload.getConfirmationToken());
        user.passwordRequestedAt = payload.getPasswordRequestedAT();

        const emailNotification = new EmailNotificationEntity();

        let urlConfirmationToken: string = Config.get('url.urlWeb') + 'changeForgotPassword/' + user.confirmationToken;

        emailNotification.name = "Forgot Password";
        emailNotification.to = payload.getEmail();
        emailNotification.subject = "Forgot Password";

        const eventHandler = EventHandler.getInstance();

        eventHandler.execute(ForgotPasswordEvent.FORGOT_PASSWORD_EVENT, {emailNotification, urlConfirmationToken});

        return {message: "We've sent you an email"};
    }
}
