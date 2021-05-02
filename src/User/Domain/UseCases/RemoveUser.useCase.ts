import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import IUserRepository from "../../InterfaceAdapters/IUser.repository";
import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";
import IUserDomain from "../../InterfaceAdapters/IUser.domain";
import {ILogRemoveProps} from "../../../App/Infrastructure/Logger/Logger";
import RoleLogTransformer from "../../../Role/Presentation/Transformers/RoleLog.transformer";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";
import UserEntity from "../User.entity";

export default class RemoveUserUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository<IUserDomain>;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();
        const user: IUserDomain = await this.repository.delete(payload.getId());

        const logRemoveProps: ILogRemoveProps = {
            type: UserEntity.name,
            entity: UserEntity.name,
            entityId: user.getId(),
            removeEntity: user,
            transformer: new RoleLogTransformer(),
            authUser,
        }

        this.logRemove(logRemoveProps)

        return user;
    }
}

