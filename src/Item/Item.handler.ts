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

    @httpPost('/', AuthorizeMiddleware(Permissions.SAVE_ITEMS))
    public async save (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveItemRequest(req);
        await ValidatorRequest.handle(_request);

        const saveItemUseCase = new SaveItemUseCase();
        const item: IItemDomain = await saveItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.LIST_ITEMS))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListItemsRequest(req);
        await ValidatorRequest.handle(_request);

        const listItemsUseCase = new ListItemsUseCase();
        const paginator: IPaginator = await listItemsUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new ItemTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.SHOW_ITEMS))
    public async getOne  (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
      const _request = new IdRequest(req);
      await ValidatorRequest.handle(_request);

      const getItemUseCase = new GetItemUseCase();
      const item: IItemDomain = await getItemUseCase.handle(_request);

      this.responder.send(item, req, res, StatusCode.HTTP_OK, new ItemTransformer());
  }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.UPDATE_ITEMS))
    public async update (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateItemRequest(req);
        await ValidatorRequest.handle(_request);

        const updateItemUseCase = new UpdateItemUseCase();
        const role: IItemDomain = await updateItemUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.REMOVE_ITEMS))
    public async remove (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeItemUseCase = new RemoveItemUseCase();
        const item: IItemDomain = await removeItemUseCase.handle(_request);

        this.responder.send(item, req, res, StatusCode.HTTP_CREATED, new ItemTransformer());
    }
}

