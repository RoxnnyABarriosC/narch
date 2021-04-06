import {validateEnv} from '../../../Config/validateEnv';
import DatabaseFactory from "../../Infrastructure/Factories/Database.factory";

const initCommand = async() =>
{
    validateEnv();

    const databaseFactory = new DatabaseFactory();

    const createConnection = databaseFactory.create();
    createConnection.initConfig();

    await createConnection.create();
};

export default initCommand;
