import {inject} from "inversify";
import {controller, httpGet, BaseHttpController, response, request, next} from "inversify-express-utils";
import {StatusCode} from "@digichanges/shared-experience";
import {TYPES} from "../types";
import Responder from "./Presentation/Shared/Responder";
import {Locales} from "./App";
import {NextFunction, Request, Response} from "express";
import GetLogViewUseCase from "./Domain/UseCases/Log/GetLogView.useCase";

@controller('/')
export default class AppHandler extends BaseHttpController
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async index ()
    {
        return this.responder.send({
            message: Locales.__('general.greetings')
            },
            this.httpContext.request,
            this.httpContext.response,
            StatusCode.HTTP_OK, null);
    }

    @httpGet('logs')
    public async logs (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        return new Promise<string>((resolve, reject) =>
        {
            const useCase = new GetLogViewUseCase();
            const data = useCase.handle();

            this.responder.render(data, 'log', res, resolve, reject);
        });
    }
}
