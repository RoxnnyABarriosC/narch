import {Connection} from "typeorm";

export default interface ICreateConnection
{
    create(): Promise<Connection>;
    close(): Promise<any>;
    drop(): Promise<any>;
    initConfig(): any;
    initConfigTest(uri: string): any;
    setAttrConfig(attribute: string, value: any): void;
}