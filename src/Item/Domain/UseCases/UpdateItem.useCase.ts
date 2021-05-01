import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UpdateITemPayload from "../../InterfaceAdapters/Payloads/UpdateITem.payload";
import _ from "lodash";
import {ILogUpdateProps} from "../../../App/Infrastructure/Logger/Logger";
import ItemEntity from "../Item.entity";
import ItemLogTransformer from "../../Presentation/Transformers/ItemLog.transformer";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import UseCaseHelper from "../../../App/Infrastructure/Helpers/UseCase.helper";

export default class UpdateItemUseCase extends UseCaseHelper
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateITemPayload): Promise<IItemDomain>
    {
        const authUser: IUserDomain = payload.getAuthUser();

        let item: IItemDomain = await this.repository.getOne(payload.getId());

        const oldItem: IItemDomain = _.cloneDeep<IItemDomain>(item);

        item.name = payload.getName();
        item.updatedBy = payload.getAuthUser();

        item = await this.repository.update(item);

        const logUpdateProps: ILogUpdateProps = {
            type: ItemEntity.name,
            entity: ItemEntity.name,
            entityId: item.getId(),
            newEntity: item,
            oldEntity: oldItem,
            transformer: new ItemLogTransformer(),
            authUser,
        };

        this.logUpdate(logUpdateProps);

        return item;
    }
}

