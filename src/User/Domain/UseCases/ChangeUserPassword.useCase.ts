import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeUserPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeUserPassword.payload";
import SaveLogUserUseCase from "../../../Log/Domain/UseCases/SaveLogUser.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";
import _ from "lodash";

export default class ChangeUserPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        const log = new SaveLogUserUseCase(payload.getAuthUser(), oldUser);
        await log.handle(LogActionEnum.CHANGE_PASSWORD);

        return await this.repository.save(user);
    }
}

