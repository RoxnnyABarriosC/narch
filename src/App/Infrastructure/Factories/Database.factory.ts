import Config from "config";
import TypeORMCreateConnection from "../Database/TypeORMCreateConnection";
import {ICreateConnection} from "@digichanges/shared-experience";

export default class DatabaseFactory
{
    private dbDefault: string;

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault
    }

    create(): ICreateConnection
    {
        let createConnection = null;

        if (!this.dbDefault)
        {
           this.dbDefault = Config.get('dbConfig.default');
        }

        const config = Config.get(`dbConfig.${this.dbDefault}`);

        if (this.dbDefault === 'TypeORM')
        {
            createConnection = new TypeORMCreateConnection(config);
        }

        return createConnection;
    }
}
