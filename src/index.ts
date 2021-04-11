import dotenv from 'dotenv';
dotenv.config(); // Need before get config

import {validateEnv} from "./Config/validateEnv";
import DatabaseFactory from "./App/Infrastructure/Factories/Database.factory";
import ICreateConnection from "./App/InterfaceAdapters/IDatabase/ICreateConnection";
import {ICacheRepository} from "@digichanges/shared-experience";
import CacheFactory from "./App/Infrastructure/Factories/Cache.factory";
import EventHandler from "./App/Infrastructure/Events/EventHandler";
import App from "./App/App";
import {loggerCli} from "./App/Infrastructure/Shared/Logger";
import Config from "config";
import SqlSeedFactory from "./App/Infrastructure/Factories/SqlSeed.factory";
import CronFactory from "./App/Infrastructure/Factories/Cron.factory";

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        await DatabaseFactory.create('TypeORM').create();

        await DatabaseFactory.create('Mongoose').create();

       /* const sqlSeeds = new SqlSeedFactory();
        sqlSeeds.init();*/

        let cache: ICacheRepository = CacheFactory.createRedisCache(); // Create for redis repository
        await cache.createConnection(Config.get("cache.redis")); // Create connection for cache
        await cache.cleanAll();

        EventHandler.getInstance();

        const cronFactory = new CronFactory();
        // cronFactory.start();

        const app = new App();
        await app.initConfig();
        await app.build();
        await app.listen();
    }
    catch (error) // TODO: Change this error catch
    {
        loggerCli.info('Error while connecting to the database', error);
        return error;
    }
})();
