import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import ChangeForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeForgotPassword.payload";

export default class ChangeForgotPasswordUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ChangeForgotPasswordPayload)
    {
        const confirmationToken = payload.getConfirmationToken();

        const user = await this.repository.getOneBy({confirmationToken});
        user.confirmationToken = null;
        user.passwordRequestedAt = null;
        user.password = await payload.getPassword();

        await this.repository.update(user);

        return {message: "Your password has been changed"};
    }
}
