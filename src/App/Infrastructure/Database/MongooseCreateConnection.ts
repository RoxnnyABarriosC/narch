import mongoose, {Connection} from 'mongoose';
import Config from 'config';
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import {loggerCli} from "../Shared/Logger";

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
