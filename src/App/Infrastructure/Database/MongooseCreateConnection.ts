import mongoose, {Connection} from 'mongoose';
import Config from 'config';
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import {loggerCli} from "../Shared/Logger";
import IItemDocument from "../../../Item/InterfaceAdapters/IItem.document";
import ItemEntity from "../../../Item/Domain/Item.entity";
import ItemMongoSchema from "../../../Item/Infrastructure/Item.mongo.schema";
import {
    EmailNotificationMongoSchema,
    NotificationMongoSchema,
    PushNotificationMongoSchema
} from "../Schema/Mongo/Notification.mongo.schema";
import INotificationDocument from "../../InterfaceAdapters/IInfraestructure/INotification.document";
import EmailNotificationEntity from "../Entities/EmailNotification.entity";
import NotificationEntity from "../Entities/Notification.entity";
import PushNotificationEntity from "../Entities/PushNotification.entity";
import TokenMongoSchema from "../Schema/Mongo/Token.mongo.schema";
import TokenEntity from "../Entities/Token.entity";
import ITokenDocument from "../../InterfaceAdapters/IInfraestructure/IToken.document";
import IUserDocument from "../../../User/InterfaceAdapters/IUser.document";
import UserEntity from "../../../User/Domain/User.entity";
import UserMongoSchema from "../../../User/Infrastructure/User.mongo.schema";
import IRoleDocument from "../../../Role/InterfaceAdapters/IRole.document";
import RoleEntity from "../../../Role/Domain/Role.entity";
import RoleMongoSchema from "../../../Role/Infrastructure/Role.mongo.schema";
import IFileDocument from "../../../File/InterfaceAdapters/IFile.document";
import FileEntity from "../../../File/Domain/File.entity";
import FileMongoSchema from "../../../File/Infrastructure/File.mongo.schema";
import ILogDocument from "../../../Log/InterfaceAdapters/ILog.document";
import LogEntity from "../../../Log/Domain/Log.entity";
import LogMongoSchema from "../../../Log/Infrastructure/Log.mongo.schema";

export let connection: Connection = null;

export default class MongooseCreateConnection implements ICreateConnection
{
    private readonly config: any;
    private uri: string;

    constructor(config: any)
    {
        this.config = config;
        this.uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=admin&w=1`;
    }

    async initConfig()
    {
        const config: any = Config.get('dbConfig.Mongoose');
        this.uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=admin&w=1`;
    }

    async initConfigTest(uri: string)
    {
        this.uri = uri;
    }

    async create(): Promise<any>
    {
        loggerCli.debug(this.uri.replace(`${this.config.username}:${this.config.password}@`,''));
        connection = await mongoose.createConnection(this.uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});

        connection.model<IUserDocument>(UserEntity.name.replace('Entity',''), UserMongoSchema);
        connection.model<IRoleDocument>(RoleEntity.name.replace('Entity',''), RoleMongoSchema);
        connection.model<IFileDocument>(FileEntity.name.replace('Entity',''), FileMongoSchema);
        connection.model<ITokenDocument>(TokenEntity.name.replace('Entity',''), TokenMongoSchema);
        connection.model<ILogDocument>(LogEntity.name.replace('Entity',''), LogMongoSchema);
        connection.model<IItemDocument>(ItemEntity.name.replace('Entity',''), ItemMongoSchema);

        // Infrastructure
        const NotificationModel = connection.model<INotificationDocument>(NotificationEntity.name.replace('Entity', ''), NotificationMongoSchema);
        NotificationModel.discriminator(EmailNotificationEntity.name.replace('Entity', ''), EmailNotificationMongoSchema);
        NotificationModel.discriminator(PushNotificationEntity.name.replace('Entity', ''), PushNotificationMongoSchema);
        connection.model<ITokenDocument>(TokenEntity.name.replace('Entity', ''), TokenMongoSchema);

        return connection;
    }

    async close(): Promise<any>
    {
        await connection.close(true);
    }

    async drop(): Promise<any>
    {
        const collections = await connection.db.collections();

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}
