import {Connection, createConnection} from "typeorm";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";

export default class TypeORMCreateConnection implements ICreateConnection
{
    private config: any;

    constructor(config: any)
    {
        this.config = config;
    }

    setAttrConfig(attribute: string, value: any): void
    {
        const newConfig = JSON.parse(JSON.stringify(this.config))
        newConfig[attribute] = value;
        this.config= newConfig;
    }

    initConfig(): any
    {
        // TODO: Init config
    }

    initConfigTest(uri: string): any
    {
        // TODO: Init config Test
    }

    async create(): Promise<Connection>
    {
        return await createConnection({...this.config});
    }

    close(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: close
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}
