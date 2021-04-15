import {inject} from "inversify";
import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {Types} from "../Types";
import Responder from "../App/Presentation/Shared/Responder";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import StatusCode from "../App/Presentation/Shared/StatusCode";
import SaveUserRequest from "./Presentation/Requests/SaveUser.request";
import SaveUserUseCase from "./Domain/UseCases/SaveUser.useCase";
import IUserDomain from "./InterfaceAdapters/IUser.domain";
import UserTransformer from "./Presentation/Transformers/User.transformer";
import ListUserRequest from "./Presentation/Requests/ListUser.request";
import ListUsersUseCase from "./Domain/UseCases/ListUsers.useCase";
import IPaginator from "../App/InterfaceAdapters/Shared/IPaginator";
import IdRequest from "../App/Presentation/Requests/Defaults/Id.request";
import GetUserUseCase from "./Domain/UseCases/GetUser.useCase";
import UpdateUserRequest from "./Presentation/Requests/UpdateUser.request";
import UpdateUserUseCase from "./Domain/UseCases/UpdateUser.useCase";
import UserAssignRoleRequest from "./Presentation/Requests/UserAssignRole.request";
import AssignRoleUseCase from "./Domain/UseCases/AssignRole.useCase";
import RemoveUserUseCase from "./Domain/UseCases/RemoveUser.useCase";
import ChangeUserPasswordRequest from "./Presentation/Requests/ChangeUserPassword.request";
import ChangeUserPasswordUseCase from "./Domain/UseCases/ChangeUserPassword.useCase";

@controller('/api/users')
export default class UserHandler
{
    @inject(Types.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.SAVE_USERS))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveUserRequest(req);
        await ValidatorRequest.handle(_request);

        const saveUserUseCase = new SaveUserUseCase();
        const user: IUserDomain = await saveUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.LIST_USERS))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListUserRequest(req);
        await ValidatorRequest.handle(_request);

        const listUsersUseCase = new ListUsersUseCase();
        const paginator: IPaginator = await listUsersUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.SHOW_USERS))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getUserUseCase = new GetUserUseCase();
        const user: IUserDomain = await getUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.UPDATE_USERS))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateUserRequest(req);
        await ValidatorRequest.handle(_request);

        const getUserUseCase = new UpdateUserUseCase();
        const user: IUserDomain = await getUserUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpPut('/assignRole/:id', AuthorizeMiddleware(Permissions.ASSING_ROLES_TO_USERS))
    public async assignRole (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UserAssignRoleRequest(req);
        await ValidatorRequest.handle(_request);

        const assignRoleUseCase = new AssignRoleUseCase();
        const _response: IUserDomain = await assignRoleUseCase.handle(_request);

        this.responder.send(_response, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.REMOVE_USERS))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeUserUseCase = new RemoveUserUseCase();
        const data = await removeUserUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_OK, new UserTransformer());
    }

    @httpPut('/changeUserPassword/:id', AuthorizeMiddleware(Permissions.CHANGE_PASSWORDS_USERS))
    public async changeUserPassword (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ChangeUserPasswordRequest(req);
        await ValidatorRequest.handle(_request);

        const changeUserPasswordUseCase = new ChangeUserPasswordUseCase();
        const user: IUserDomain = await changeUserPasswordUseCase.handle(_request);

        this.responder.send(user, req, res, StatusCode.HTTP_CREATED, new UserTransformer());
    }
}
