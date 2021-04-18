import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import {SERVICES} from "../../../Services";
import IItemRepository from "../../InterfaceAdapters/IItem.repository";
import IAuthService from "../../../User/InterfaceAdapters/IAuth.service";
import IItemDomain from "../../InterfaceAdapters/IItem.domain";
import UpdateITemPayload from "../../InterfaceAdapters/Payloads/UpdateITem.payload";
import _ from "lodash";
import SaveLogItemUseCase from "../../../Log/Domain/UseCases/SaveLogItem.useCase";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export default class UpdateItemUseCase
{
    @lazyInject(REPOSITORIES.IItemRepository)
    private repository: IItemRepository<IItemDomain>;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UpdateITemPayload): Promise<IItemDomain>
    {
        const item: IItemDomain = await this.repository.getOne(payload.getId());

        const oldItem: IItemDomain = _.cloneDeep<IItemDomain>(item);

        item.name = payload.getName();
        item.updatedBy = payload.getAuthUser();

        const log = new SaveLogItemUseCase(payload.getAuthUser(), oldItem);
        await log.handle(LogActionEnum.UPDATE);

        return await this.repository.save(item);
    }
}

