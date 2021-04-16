import lazyInject from "../../../LazyInject";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import {REPOSITORIES} from "../../../Repositories";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";
import LogActionEnum from "../../Infrastructure/Enum/LogActionEnum";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import IItemDomain from "../../../Item/InterfaceAdapters/IItem.domain";
import LogEntity from "../Log.entity";
import _ from "lodash";
import ItemEntity from "../../../Item/Domain/Item.entity";

export default class SaveLogItemUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    private readonly authUser: IUserDomain;
    private readonly entity: IItemDomain;

    constructor(authUser: IUserDomain, entity: IItemDomain)
    {
        this.authUser = authUser;
        this.entity = entity;
    }

    async handle(logAction: LogActionEnum): Promise<void>
    {
        const log: ILogDomain = new LogEntity();

        log.action = logAction;
        log.entity = ItemEntity.name;
        log.entityId = this.entity.getId();
        log.createdBy = this.authUser;

        switch (logAction)
        {
            case LogActionEnum.SAVE :
               await this.save(log,logAction);
               break
            case LogActionEnum.UPDATE :
            case LogActionEnum.REMOVE :
                await this.updateOrDelete(log,logAction);
                break
        }

        await this.repository.save(log);
    }

    private async save(log: ILogDomain, logAction: LogActionEnum): Promise<void>
    {
        log.description = `${this.authUser.email} created the item`;
    }

    private async updateOrDelete(log: ILogDomain, logAction: LogActionEnum): Promise<void>
    {
       const action: string = logAction === LogActionEnum.UPDATE ? 'updated' : 'deleted';

        log.description = `${this.authUser.email} ${action} the item`;
        log.metadata = this.processEntity();
    }

    private processEntity(): {}
    {
        const deleteAttributes: string[] = ['_id', '__v', 'createdAt', 'updatedAt','createdBy', 'updatedBy'];

        const metadata = JSON.parse(JSON.stringify(this.entity));

        _.map(deleteAttributes, attr => delete metadata[attr]);

        return metadata;
    }
}
