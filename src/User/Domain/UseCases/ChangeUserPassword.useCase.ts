import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeUserPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeUserPassword.payload";


export default class ChangeUserPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.repository.getOne(payload.getId());

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}

