import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {IEncryption} from "@digichanges/shared-experience";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import EncryptionFactory from "../../../App/Infrastructure/Factories/Encryption.factory";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import ChangeUserPasswordPayload from "../../InterfaceAdapters/Payloads/ChangeUserPassword.payload";
import _ from "lodash";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import UserEntity from "../User.entity";
import UserLogTransformer from "../../Presentation/Transformers/UserLog.transformer";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class ChangeUserPasswordUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    private encryption: IEncryption;

    constructor()
    {
        super();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        let user: IUserDomain = await this.repository.getOne(payload.getId());
        const oldUser: IUserDomain = _.cloneDeep<IUserDomain>(user);

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        user = await this.repository.update(user);

        const logUpdateProps: ILogUpdateProps<UserEntity> = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            newEntity: user,
            oldEntity: oldUser,
            description: `${authUser.email} changed the user password`,
            ignore: ['password'],
            transformer: new UserLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return user;
    }
}

