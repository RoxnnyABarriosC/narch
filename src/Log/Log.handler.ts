import {inject} from "inversify";
import {NextFunction, Request, Response} from 'express';
import {controller, httpGet, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from "@digichanges/shared-experience";
import Responder from "../App/Presentation/Shared/Responder";
import {Types} from "../Types";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import ILogDomain from "./InterfaceAdapters/ILog.domain";
import LogTransformer from "./Presentation/Transformers/Log.transformer";
import ListLogsRequest from "./Presentation/Requests/ListLogs.request";
import ListLogsUseCase from "./Domain/UseCases/ListLogs.useCase";
import IdRequest from "../App/Presentation/Requests/Defaults/Id.request";
import GetLogUseCase from "./Domain/UseCases/GetLog.useCase";

@controller('/api/logs')
export default class LogHandler
{
    @inject(Types.Responder)
    private responder: Responder;

    @httpGet('/', AuthorizeMiddleware(Permissions.LOGS_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListLogsRequest(req);
        await ValidatorRequest.handle(_request);

        const listLogsUseCase = new ListLogsUseCase();
        const paginator: IPaginator = await listLogsUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new LogTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ITEMS_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
      const _request = new IdRequest(req);
      await ValidatorRequest.handle(_request);

      const getLogUseCase = new GetLogUseCase();
      const item: ILogDomain = await getLogUseCase.handle(_request);

      this.responder.send(item, req, res, StatusCode.HTTP_OK, new LogTransformer());
  }

}

