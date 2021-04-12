import {inject} from "inversify";
import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from "@digichanges/shared-experience";
import Responder from "../App/Presentation/Shared/Responder";
import {Types} from "../Types";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import SaveItemRequest from "./Presentation/Requests/SaveItem.request";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import SaveItemUseCase from "./Domain/UseCases/SaveItem.useCase";
import IItemDomain from "./InterfaceAdapters/IItem.domain";
import ItemTransformer from "./Presentation/Transformers/Item.transformer";
import ListItemsRequest from "./Presentation/Requests/ListItems.request";
import ListItemsUseCase from "./Domain/UseCases/ListItems.useCase";
import IdRequest from "../App/Presentation/Requests/Defaults/Id.request";
import GetItemUseCase from "./Domain/UseCases/GetItem.useCase";
import UpdateItemRequest from "./Presentation/Requests/UpdateItem.request";
import UpdateItemUseCase from "./Domain/UseCases/UpdateItem.useCase";
import RemoveItemUseCase from "./Domain/UseCases/RemoveItem.useCase";

@controller('/api/items')
export default class ItemHandler
{
    @inject(Types.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ITEMS_SAVE))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveItemRequest(req);
        await ValidatorRequest.handle(_request);

        const saveRoleUseCase = new SaveItemUseCase();
        const item: IItemDomain = await saveRoleUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

  /*  @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListItemsRequest(req);
        await ValidatorRequest.handle(_request);

        const listRolesUseCase = new ListItemsUseCase();
        const paginator: IPaginator = await listRolesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getRoleUseCase = new GetItemUseCase();
        const role: IItemDomain = await getRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateItemRequest(req);
        await ValidatorRequest.handle(_request);

        const updateRoleUseCase = new UpdateItemUseCase();
        const role: IItemDomain = await updateRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeRoleUseCase = new RemoveItemUseCase();
        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }*/
}

