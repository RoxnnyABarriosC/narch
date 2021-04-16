import lazyInject from "../../../LazyInject";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import {REPOSITORIES} from "../../../Repositories";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";
import LogActionEnum from "../../Infrastructure/Enum/LogActionEnum";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import LogEntity from "../Log.entity";
import _ from "lodash";
import IRoleDomain from "../../../Role/InterfaceAdapters/IRole.domain";
import RoleEntity from "../../../Role/Domain/Role.entity";

export default class SaveLogRoleUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    private readonly authUser: IUserDomain;
    private readonly entity: IRoleDomain | any;

    constructor(authUser: IUserDomain, entity: IRoleDomain)
    {
        this.authUser = authUser;
        this.entity = entity;
    }

    async handle(logAction: LogActionEnum): Promise<void>
    {
        const log: ILogDomain = new LogEntity();

        log.action = logAction;
        log.entity = RoleEntity.name;
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
        log.description = `${this.authUser.email} created the role`;
    }

    private async updateOrDelete(log: ILogDomain, logAction: LogActionEnum): Promise<void>
    {
        const action: string = logAction === LogActionEnum.UPDATE ? 'updated' : 'deleted';

        log.description = `${this.authUser.email} ${action} the role`;
        log.metadata = this.processEntity();
    }

    private processEntity(): {}
    {
        const deleteAttributes: string[] = ['_id', '__v', 'createdAt', 'updatedAt'];

        const metadata = JSON.parse(JSON.stringify(this.entity));

        _.map(deleteAttributes, attr => delete metadata[attr]);

        return metadata;
    }
}
