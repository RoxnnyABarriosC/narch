import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import ContainerFactory from "../../../App/Infrastructure/Factories/Container.factory";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import {REPOSITORIES} from "../../../Repositories";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeUserPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeUserPassword.payload";


export default class ChangeUserPasswordUseCase
{
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}

