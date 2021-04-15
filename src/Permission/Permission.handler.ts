import {controller, request, response, next, httpGet, httpPost} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import {StatusCode} from "@digichanges/shared-experience";
import {inject} from "inversify";
import {Types} from "../Types";
import Responder from "../App/Presentation/Shared/Responder";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import PermissionUseCase from "./Domain/UseCases/Permission.useCase";
import PermissionsTransformer from "../Auth/Presentation/Transformers/Permissions.transformer";
import SyncRolesPermissionUseCase from "./Domain/UseCases/SyncRolesPermission.useCase";

@controller('/api/permissions')
export default class PermissionHandler
{
    @inject(Types.Responder)
    private responder: Responder;

    @httpGet('/', AuthorizeMiddleware(Permissions.GET_PERMISSIONS))
    public async permissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const permissionUseCase = new PermissionUseCase();
        const payload = await permissionUseCase.handle();

        this.responder.send(payload, req, res, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    @httpPost('/syncRolesPermissions', AuthorizeMiddleware(Permissions.SYNC_PERMISSIONS))
    public async syncRolesPermissions (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        await syncRolesPermissionUseCase.handle();

        this.responder.send({message: "Sync Successfully"}, req, res, StatusCode.HTTP_CREATED, null);
    }
}
