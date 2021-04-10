import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../../User/InterfaceAdapters/IUser.repository";
import ChangeForgotPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeForgotPassword.payload";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";

export default class ChangeForgotPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

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
