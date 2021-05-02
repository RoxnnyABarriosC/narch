import _ from "lodash";
import EventHandler from "../Events/Event.handler";
import LoggerEvent from "../Events/Logger.event";
import {ILogRemoveProps, ILogSaveProps, ILogUpdateProps} from "../Logger/Logger";

export default class UseCaseHelper
{
    private event: EventHandler =  EventHandler.getInstance();

    protected async updateOrCreateRelationshipById<IDomain, IReturnDomain>(entity: IDomain, attribute: string , id: string, repository: string): Promise<IReturnDomain | null>
    {
        if (_.isNull(id))
        {
            return id;
        }

        if (!_.isNull(id) && !_.isUndefined(id))
        {
            // @ts-ignore
            if (entity[attribute]?.getId() === id)
            {
                // @ts-ignore
                return entity[attribute];
            }

            else
            {
                // @ts-ignore
                return await this[repository].getOne(id);
            }
        }

        if (_.isUndefined(id))
        {
            // @ts-ignore
            return entity[attribute];
        }
    }

    protected logSave(props: ILogSaveProps): void
    {
        this.event.emit(LoggerEvent.LOG_SAVE_EVENT, props);
    }

    protected logUpdate(props: ILogUpdateProps): void
    {
        this.event.emit(LoggerEvent.LOG_UPDATE_EVENT, props);
    }

    protected logRemove(props: ILogRemoveProps): void
    {
        this.event.emit(LoggerEvent.LOG_REMOVE_EVENT, props);
    }

    protected eventExecute(event: string, props: any): void
    {
        this.event.execute(event, props);
    }
}