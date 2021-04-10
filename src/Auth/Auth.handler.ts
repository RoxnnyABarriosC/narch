import {controller, httpPost, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import {StatusCode} from "@digichanges/shared-experience";

import {inject} from "inversify";
import {SERVICES} from "../Services";
import IAuthService from "../App/InterfaceAdapters/IServices/IAuthService";
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
import PermissionUseCase from "./Domain/UseCases/Permission.useCase";
import PermissionsTransformer from "./Presentation/Transformers/Permissions.transformer";
import SyncRolesPermissionUseCase from "./Domain/UseCases/SyncRolesPermission.useCase";
import RegisterRequest from "./Presentation/Requests/Register.request";
import RegisterUseCase from "./Domain/UseCases/Register.useCase";
import IToken from "../App/InterfaceAdapters/Shared/IToken";

@controller('/api/auth')
class AuthHandler
{
    @inject(SERVICES.IAuthService)
    private service: IAuthService;

    @inject(Types.Responder)
    private responder: Responder;

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

    @httpPost('/keepAlive', AuthorizeMiddleware(Permissions.AUTH_KEEP_ALIVE))
    public async keepAlive (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new KeepAliveRequest(req);
        await ValidatorRequest.handle(_request);

        const keepAliveUseCase = new KeepAliveUseCase();
        const payload: IToken = await keepAliveUseCase.handle(_request);

        this.responder.send(payload, null, res, StatusCode.HTTP_CREATED, new AuthTransformer());
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

    @httpGet('/permissions', AuthorizeMiddleware(Permissions.GET_PERMISSIONS))
    public async permissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const permissionUseCase = new PermissionUseCase();
        const payload: string[] = await permissionUseCase.handle();

        this.responder.send(payload, req, res, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    @httpPost('/syncRolesPermissions', AuthorizeMiddleware(Permissions.AUTH_SYNC_PERMISSIONS))
    public async syncRolesPermissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        await syncRolesPermissionUseCase.handle();

        this.responder.send({message: "Sync Successfully"}, req, res, StatusCode.HTTP_CREATED, null);
    }
}
