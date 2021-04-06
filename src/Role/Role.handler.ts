import {inject} from "inversify";
import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from "@digichanges/shared-experience";
import Responder from "../App/Presentation/Shared/Responder";
import {TYPES} from "../types";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import SaveRoleRequest from "./Presentation/Requests/SaveRole.request";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import SaveRoleUseCase from "./Domain/UseCases/SaveRole.useCase";
import IRoleDomain from "./InterfaceAdapters/IRole.domain";
import RoleTransformer from "./Presentation/Transformers/Role.transformer";
import ListRolesRequest from "./Presentation/Requests/ListRoles.request";
import ListRolesUseCase from "./Domain/UseCases/ListRoles.useCase";
import IdRequest from "../App/Presentation/Requests/Defaults/Id.request";
import GetRoleUseCase from "./Domain/UseCases/GetRole.useCase";
import UpdateRoleRequest from "./Presentation/Requests/UpdateRole.request";
import UpdateRoleUseCase from "./Domain/UseCases/UpdateRole.useCase";
import RemoveRoleUseCase from "./Domain/UseCases/RemoveRole.useCase";


@controller('/api/roles')
export default class RoleHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveRoleRequest(req);
        await ValidatorRequest.handle(_request);

        const saveRoleUseCase = new SaveRoleUseCase();
        const role: IRoleDomain = await saveRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListRolesRequest(req);
        await ValidatorRequest.handle(_request);

        const listRolesUseCase = new ListRolesUseCase();
        const paginator: IPaginator = await listRolesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getRoleUseCase = new GetRoleUseCase();
        const role: IRoleDomain = await getRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateRoleRequest(req);
        await ValidatorRequest.handle(_request);

        const updateRoleUseCase = new UpdateRoleUseCase();
        const role: IRoleDomain = await updateRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeRoleUseCase = new RemoveRoleUseCase();
        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }
}

