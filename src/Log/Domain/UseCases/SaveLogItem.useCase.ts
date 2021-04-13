import lazyInject from "../../../LazyInject";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import {REPOSITORIES} from "../../../Repositories";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";
import LogActionEnum from "../../Infrastructure/Enum/LogActionEnum";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import IItemDomain from "../../../Item/InterfaceAdapters/IItem.domain";
import LogEntity from "../Log.entity";
import _ from "lodash";

export default class SaveLogItemUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    private authUser: IUserDomain;
    private entity: IItemDomain | any;

    constructor(authUser: IUserDomain, entity: IItemDomain)
    {
        this.authUser = authUser;
        this.entity = entity;
    }

    async handle(logAction: LogActionEnum): Promise<void>
    {
        switch (logAction)
        {
            case LogActionEnum.SAVE :
               await this.save(logAction);
               break
            case LogActionEnum.UPDATE :
            case LogActionEnum.REMOVE :
                await this.updateOrDelete(logAction);
                break
        }

    }

    private async save(logAction: LogActionEnum): Promise<void>
    {
        const log: ILogDomain = new LogEntity();

        log.action = logAction;
        log.entity = LogEntity.name;
        log.entityId = this.entity.getId();
        log.description = `${this.authUser.email} created the item`;
        log.createdBy = this.authUser;

        await this.repository.save(log);
    }

    private async updateOrDelete(logAction: LogActionEnum): Promise<void>
    {
        const log: ILogDomain = new LogEntity();

        const action: string = logAction === LogActionEnum.UPDATE ? 'updated' : 'deleted';

        log.action = logAction;
        log.entity = LogEntity.name;
        log.entityId = this.entity.getId();
        log.description = `${this.authUser.email} ${action} the item`;
        log.createdBy = this.authUser;
        log.metadata = this.processEntity();

        await this.repository.save(log);
    }

    private processEntity(): {}
    {
        const deleteAttributes: string[] = ['_id','createdBy', 'updatedBy','__v'];

        const metadata = JSON.parse(JSON.stringify(this.entity));

        _.map(deleteAttributes, attr => delete metadata[attr]);

        return metadata;
    }
}
