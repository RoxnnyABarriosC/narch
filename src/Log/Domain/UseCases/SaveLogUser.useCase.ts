import lazyInject from "../../../LazyInject";
import ILogRepository from "../../InterfaceAdapters/ILog.repository";
import {REPOSITORIES} from "../../../Repositories";
import ILogDomain from "../../InterfaceAdapters/ILog.domain";
import LogActionEnum from "../../Infrastructure/Enum/LogActionEnum";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import LogEntity from "../Log.entity";
import _ from "lodash";
import UserEntity from "../../../User/Domain/User.entity";

export default class SaveLogUserUseCase
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private repository: ILogRepository<ILogDomain>;

    private readonly entity: IUserDomain;
    private readonly authUser: IUserDomain;

    constructor(authUser: IUserDomain, entity: IUserDomain)
    {
        this.authUser = authUser;
        this.entity = entity;
    }

    async handle(logAction: LogActionEnum): Promise<void>
    {
        const log: ILogDomain = new LogEntity();

        log.action = logAction;
        log.entity = UserEntity.name;
        log.createdBy = this.authUser;
        log.entityId = this.entity.getId();

        switch (logAction)
        {
            case LogActionEnum.SAVE :
               await this.save(log, logAction);
               break
            case LogActionEnum.UPDATE :
            case LogActionEnum.REMOVE :
                await this.updateOrDelete(log, logAction);
                break
            case LogActionEnum.CHANGE_PASSWORD :
                await this.changePassword(log, logAction);
                break
        }

        await this.repository.save(log);
    }

    private async save(log: ILogDomain, logAction: LogActionEnum): Promise<void>
    {
        log.description = `${this.authUser.email} created the user`;
    }

    private async updateOrDelete(log: ILogDomain, logAction: LogActionEnum): Promise<void>
    {
        const action: string = logAction === LogActionEnum.UPDATE ? 'updated' : 'deleted';

        log.description = `${this.authUser.email} ${action} the user`;
        log.metadata = this.processEntity();
    }

    private async changePassword(log:ILogDomain, logAction: LogActionEnum): Promise<void>
    {
        log.description = `${this.authUser.email} changed the user password`;
        log.metadata = {password: this.entity.password}
    }

    private processEntity(): {}
    {
        const deleteAttributes: string[] = ['_id','__v','createdAt', 'updatedAt', 'roles', 'mainPicture'];

        const mainPictureId: string = this.entity?.getMainPicture()?.getId();
        const rolesId: string[] = _.map(this.entity?.getRoles(), role => role.getId());

        const metadata: any = JSON.parse(JSON.stringify(this.entity));

        _.map(deleteAttributes, attr => delete metadata[attr]);

        metadata.mainPicture = mainPictureId
        metadata.roles = rolesId;

        return metadata;
    }
}
