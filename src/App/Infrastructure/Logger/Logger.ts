import _ from "lodash";
import Transformer from "../../Presentation/Shared/Transformer";
import jsonDiff from "json-diff"
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import ILogRepository from "../../../Log/InterfaceAdapters/ILog.repository";
import LogEntity from "../../../Log/Domain/Log.entity";
import ILogDomain from "../../../Log/InterfaceAdapters/ILog.domain";
import LogActionEnum from "../../../Log/Infrastructure/Enum/LogActionEnum";

export declare interface ILogSaveProps
{
    type: string
    entity: string;
    entityId: string;
    parentId?: string;
    metadata?: {};
    description?: string;
    authUser: IUserDomain;
}

declare interface ILogTransformer {
    transformer: Transformer;
}

export declare interface ILogRemoveProps extends ILogSaveProps, ILogTransformer
{
    removeEntity: {};
}

export declare interface ILogUpdateProps extends ILogSaveProps,ILogTransformer
{
    oldEntity: {};
    newEntity: {};
}

declare interface IDiff {
    [key: string]: {
        [key: string]: any;
    }
}

export declare interface IDifferences {
    differences: IDiff;
}

export default class Logger
{
    @lazyInject(REPOSITORIES.ILogRepository)
    private static repository: ILogRepository<ILogDomain>;

    public static async save(props: ILogSaveProps)
    {
        const { type, entity, entityId, parentId, metadata, authUser } = props;
        let { description } = props;

        const log: ILogDomain = new LogEntity();

        if (_.isUndefined(description) || _.isNull(description))
        {
            description = `${authUser.email} created the ${entity.replace('Entity','')}`;
        }

        log.type = type;
        log.action = LogActionEnum.SAVE;
        log.entity = entity;
        log.entityId = entityId;
        log.parentId = !_.isUndefined(parentId) ? parentId : entityId;
        log.description = description;
        log.metadata = !_.isUndefined(metadata) ? metadata : null;
        log.createdBy = authUser;

        await this.repository.save(log);
    }

    public static async remove(props: ILogRemoveProps)
    {
        const { type, entity, entityId, parentId, transformer, authUser } = props;
        let {metadata, description, removeEntity} = props;

        if(!_.isNull(transformer))
        {
            removeEntity = transformer.handle(removeEntity);
        }

        if (_.isUndefined(description) || _.isNull(description))
        {
            description = `${authUser.email} removed the ${entity.replace('Entity','')}`;
        }

        const removed = { removed: removeEntity }

        if (_.isUndefined(metadata) || _.isNull(metadata))
        {
            metadata = removed;
        }

        else
        {
            metadata = _.merge(removed, metadata);
        }

        const log: ILogDomain = new LogEntity();

        log.type = type;
        log.action = LogActionEnum.REMOVE;
        log.entity = entity;
        log.entityId = entityId;
        log.parentId = !_.isUndefined(parentId) ? parentId : entityId;
        log.description = description;
        log.metadata = metadata;
        log.createdBy = authUser;

        await this.repository.save(log);
    }

    public static async update(props: ILogUpdateProps)
    {
        const { type, entity, entityId, parentId,transformer, authUser } = props;
        let {metadata, description, oldEntity, newEntity } = props;

        if(!_.isNull(transformer))
        {
            newEntity = transformer.handle(newEntity);
            oldEntity = transformer.handle(oldEntity);
        }

        if (_.isUndefined(description) || _.isNull(description))
        {
            description = `${authUser.email} updated the ${entity.replace('Entity','')}`;
        }

        const differences = this.differences(jsonDiff.diff(oldEntity, newEntity));

        if (_.isUndefined(metadata) || _.isNull(metadata))
        {
            metadata = differences;
        }

        else
        {
            metadata = _.merge(differences, metadata);
        }

        const log: ILogDomain = new LogEntity();

        log.type = type;
        log.action = LogActionEnum.UPDATE;
        log.entity = entity;
        log.entityId = entityId;
        log.parentId = !_.isUndefined(parentId) ? parentId : entityId;
        log.description = description;
        log.metadata = metadata;
        log.createdBy = authUser;

        await this.repository.save(log);
    }

    private static differences(differ: IDiff): IDifferences
    {
        const diffMap = (diff: IDiff) => {
            const keyValues = Object.keys(diff).map(key =>
            {
                let newKey;

                if (key === '__old')
                {
                    newKey = 'old';
                }

                else if (key === '__new')
                {
                    newKey = 'new';
                }

                else
                {
                    newKey = key
                    diff[key] = diffMap(diff[key]);
                }

                return { [newKey]: diff[key] };
            });

            return Object.assign({}, ...keyValues)
        }

        return { differences:  diffMap(differ) } as IDifferences;
    }
}