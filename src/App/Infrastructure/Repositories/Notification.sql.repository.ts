import {injectable} from "inversify";
import {Repository, getRepository} from "typeorm";

import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import ICriteria from "../../InterfaceAdapters/Shared/ICriteria";

import INotificationDomain from "../../InterfaceAdapters/IInfraestructure/INotificationDomain";

import Paginator from "../../Presentation/Shared/Paginator";
import INotificationRepository from "../../InterfaceAdapters/IRepository/INotificationRepository";
import TypeNotificationEntity from "../Entities/TypeNotification.entity";
import TypeNotificationSqlSchema from "../Schema/Notification.sql.schema";
import NotFoundException from "../Exceptions/NotFound.exception";

@injectable()
export default class NotificationSqlRepository implements INotificationRepository
{
    private readonly repository: Repository<TypeNotificationEntity>;

    constructor()
    {
        this.repository = getRepository<TypeNotificationEntity>(TypeNotificationSqlSchema);
    }

    async save (notification: INotificationDomain): Promise<INotificationDomain>
    {
        return await this.repository.save(notification);
    }

    async getOne(id: string): Promise<INotificationDomain>
    {
        const notification = await this.repository.findOne({_id: id});

        if (!notification)
        {
            throw new NotFoundException('Notification');
        }

        return notification;
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder = this.repository.createQueryBuilder("i");

        const filter = criteria.getFilter();

        queryBuilder.where("1 = 1");


        return new Paginator(queryBuilder, criteria);
    }
}
