import {IEncryption} from "@digichanges/shared-experience";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import {REPOSITORIES} from "../../../Repositories";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeMyPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeMyPassword.payload";
import PasswordWrongException from "../../../Auth/Domain/Exceptions/PasswordWrong.exception";

export default class ChangeMyPasswordUseCase
{
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user = await this.repository.getOne(id);

        if(! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}
