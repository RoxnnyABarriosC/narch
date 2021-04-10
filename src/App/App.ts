import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import {Application} from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import exphbs from 'express-handlebars';
import Config from 'config';
import i18n from 'i18n';

import "./App.handler";
import "./../User/User.handler";
import "./../Auth/Auth.handler";
import "./../File/File.handler";

import container from "../Inversify.config";
import LoggerWinstonMiddleware from "./Presentation/Middlewares/LoggerWinston.middleware";
import ThrottleMiddleware from "./Presentation/Middlewares/Throttle.middleware";
import AuthenticationMiddleware from "../Auth/Presentation/Middlewares/Authentication.middleware";
import VerifyTokenMiddleware from "./Presentation/Middlewares/VerifyToken.middleware";
import ErrorHandler from "./Presentation/Shared/ErrorHandler";
import RedirectRouteNotFoundMiddleware from "./Presentation/Middlewares/RedirectRouteNotFound.middleware";
import {loggerCli} from "./Infrastructure/Shared/Logger";
import path from "path";

export let Locales = i18n;

export default class App
{
    public port?: number;
    private server: InversifyExpressServer;
    private app: Application;
    private hbs: Exphbs;
    private viewRoute: string;

    constructor()
    {
        this.port = (Config.get('serverPort') || 8090); // default port to listen;
        this.server = new InversifyExpressServer(container);
        this.initLocale('es');
        this.initHandlebars();
    }

    public initLocale(defaultLocale: string = 'en'): void
    {
        Locales.configure({
            locales: ['en', 'es'],
            directory: path.join(__dirname, "../Config/Locales"),
            defaultLocale,
            objectNotation: true
        });
    }

    public initHandlebars(): void
    {
        this.viewRoute = path.join(__dirname, "/Presentation/Views");

        this.hbs = exphbs.create({
            defaultLayout: 'main',
            extname: '.hbs',
            layoutsDir: `${this.viewRoute}/Layouts`,
            partialsDir: `${this.viewRoute}/Partials`
        });
    }

    public async initConfig(): Promise<void>
    {
        this.server.setConfig((app: Application) =>
        {
            app
            .use(bodyParser.urlencoded({
                extended: true,
                limit: '5mb'
            }))
            .use(bodyParser.json({
                limit: '5mb'
            }))
            .use(compression())
            .use(cors())
            .use(helmet())
            .set('views', this.viewRoute)
            .engine('.hbs', this.hbs.engine)
            .set('view engine', '.hbs')
            .use(LoggerWinstonMiddleware)
            .use('/api/', ThrottleMiddleware)
            .use(AuthenticationMiddleware)
            .use(VerifyTokenMiddleware)
            .use(Locales.init)
        });

        this.server.setErrorConfig((app: Application) =>
        {
            app.use(ErrorHandler.handle);
        });
    }

    public async build(): Promise<void>
    {
        this.app = await this.server.build();
    }

    public async listen(): Promise<void>
    {
        this.app.use(RedirectRouteNotFoundMiddleware);

        this.app.listen(this.port, () => {
            loggerCli.debug(`App listening on the port ${this.port}`);
        });
    }
}