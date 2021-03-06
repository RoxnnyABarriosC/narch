import Config from "config";
import TypeORMCreateConnection from "../Database/TypeORMCreateConnection";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import MongooseCreateConnection from "../Database/MongooseCreateConnection";

export default class DatabaseFactory
{
    static create(dbName?: 'TypeORM' | 'Mongoose'): ICreateConnection
    {
        let dbDefault: string = dbName;

        let createConnection = null;

        if (!dbDefault)
        {
           dbDefault = Config.get('dbConfig.default');
        }

        const config = Config.get(`dbConfig.${dbDefault}`);

        if (dbDefault === 'TypeORM')
        {
            createConnection = new TypeORMCreateConnection(config);
        }

        if (dbDefault === 'Mongoose')
        {
            createConnection = new MongooseCreateConnection(config);
        }

        return createConnection;
    }
}
