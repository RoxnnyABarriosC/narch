import {controller, httpPost, request, response, next, httpGet, httpPut} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import {StatusCode} from "@digichanges/shared-experience";

import {inject} from "inversify";
import {SERVICES} from "../Services";
import IAuthService from "../User/InterfaceAdapters/IAuth.service";
import {Types} from "../Types";
import Responder from "../App/Presentation/Shared/Responder";
import AuthRequest from "./Presentation/Requests/Auth.request";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import LoginUseCase from "./Domain/UseCases/Login.useCase";
import AuthTransformer from "./Presentation/Transformers/Auth.transformer";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import KeepAliveRequest from "./Presentation/Requests/KeepAlive.request";
import KeepAliveUseCase from "./Domain/UseCases/KeepAlive.useCase";
import ForgotPasswordRequest from "./Presentation/Requests/ForgotPassword.request";
import ForgotPasswordUseCase from "./Domain/UseCases/ForgotPassword.useCase";
import ChangeForgotPasswordRequest from "./Presentation/Requests/ChangeForgotPassword.request";
import ChangeForgotPasswordUseCase from "./Domain/UseCases/ChangeForgotPassword.useCase";
import RegisterRequest from "./Presentation/Requests/Register.request";
import RegisterUseCase from "./Domain/UseCases/Register.useCase";
import IToken from "../App/InterfaceAdapters/Shared/IToken";
import ChangeMyPasswordRequest from "./Presentation/Requests/ChangeMyPassword.request";
import ChangeMyPasswordUseCase from "./Domain/UseCases/ChangeMyPassword.useCase";
import AuthUserRequest from "../App/Presentation/Requests/Defaults/AuthUser.request";
import GetMeUseCase from "./Domain/UseCases/getMe.useCase";
import KeepAliveTransformer from "./Presentation/Transformers/KeepAlive.transformer";
import UpdateMeUseCase from "./Domain/UseCases/UpdateMe.useCase";
import UpdateMeRequest from "./Presentation/Requests/UpdateMe.request";

@controller('/api/auth')
export default class AuthHandler
{
    @inject(SERVICES.IAuthService)
    private service: IAuthService;

    @inject(Types.Responder)
    private responder: Responder;

    @httpGet('/me', AuthorizeMiddleware(Permissions.SHOW_ME))
    public async me (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new AuthUserRequest(req);
        await ValidatorRequest.handle(_request);

        const getMeUseCase = new GetMeUseCase();
        const payload: IToken = await getMeUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_OK, new AuthTransformer());
    }

    @httpPut('/me', AuthorizeMiddleware(Permissions.UPDATE_ME))
    public async updateMe (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateMeRequest(req);
        await ValidatorRequest.handle(_request);

        const updateMeUseCase = new UpdateMeUseCase();
        const payload: IToken = await updateMeUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_OK, new AuthTransformer());
    }

    @httpPost('/login')
    public async login (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new AuthRequest(req);
        await ValidatorRequest.handle(_request);

        const loginUseCase = new LoginUseCase();
        const payload: IToken = await loginUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_OK, new AuthTransformer());
    }

    @httpPost('/register')
    public async register (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RegisterRequest(req);
        await ValidatorRequest.handle(_request);

        const registerUseCase = new RegisterUseCase();
        const payload: IToken = await registerUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new KeepAliveRequest(req);
        await ValidatorRequest.handle(_request);

        const keepAliveUseCase = new KeepAliveUseCase();
        const payload: IToken = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new KeepAliveTransformer());
    }

    @httpPost('/forgotPassword')
    public async forgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const forgotPasswordUseCase = new ForgotPasswordUseCase();
        const payload = await forgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_OK, null);
    }

    @httpPost('/changeForgotPassword')
    public async changeForgotPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeForgotPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeForgotPasswordUseCase = new ChangeForgotPasswordUseCase();
        const payload = await changeForgotPasswordUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, null);
    }

    @httpPost('/changeMyPassword', AuthorizeMiddleware(Permissions.CHANGE_MY_PASSWORD))
    public async changeMyPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeMyPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeMyPasswordUseCase = new ChangeMyPasswordUseCase();
        const payload: IToken = await changeMyPasswordUseCase.handle(_request);

        this.responder.send(payload, req, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }
}
