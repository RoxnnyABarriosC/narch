import { v4 as uuidv4 } from 'uuid';
import INotificationDomain from "../../InterfaceAdapters/IInfraestructure/INotificationDomain";

export default class NotificationEntity implements INotificationDomain
{
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor()
    {
        this._id = uuidv4();
    }

    getId(): string
    {
        return this._id;
    }
}
