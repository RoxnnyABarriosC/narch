import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeMyPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeMyPassword.payload";
import PasswordWrongException from "../../../Auth/Domain/Exceptions/PasswordWrong.exception";

export default class ChangeMyPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const user = await this.repository.getOne(payload.getId());

        if(! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}
