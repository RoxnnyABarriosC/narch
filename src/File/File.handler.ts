import {inject} from "inversify";
import {controller, httpPost, request, response, next, httpGet, httpPut} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import {IPaginator, StatusCode} from "@digichanges/shared-experience";
import Responder from "../App/Presentation/Shared/Responder";
import AuthorizeMiddleware from "../App/Presentation/Middlewares/Authorize.middleware";
import Permissions from "../Config/Permissions";
import ListFilesRequest from "./Presentation/Requests/ListFiles.request";
import {Types} from "../Types";
import ValidatorRequest from "../App/Shared/ValidatorRequest";
import ListFilesUseCase from "./Domain/UseCases/ListFiles.useCase";
import FileTransformer from "./Presentation/Transformers/File.transformer";
import ListObjectsRequest from "./Presentation/Requests/ListObjects.request";
import ListObjectsUseCase from "./Domain/UseCases/ListObjects.useCase";
import ObjectTransformer from "./Presentation/Transformers/Object.transformer";
import SaveFileBase64Request from "./Presentation/Requests/SaveFileBase64.request";
import SaveFileMulterMiddleware from "./Presentation/Middlewares/SaveFileMulter.middleware";
import SaveFileMultipartRequest from "./Presentation/Requests/SaveFileMultipart.request";
import UploadMultipartUseCase from "./Domain/UseCases/UploadMultipart.useCase";
import SavePresignedFileRequest from "./Presentation/Requests/SavePresignedFile.request";
import GetPresignedGetObjectUseCase from "./Domain/UseCases/GetPresignedGetObject.useCase";
import IdRequest from "../App/Presentation/Requests/Defaults/Id.request";
import DownloadUseCase from "./Domain/UseCases/Download.useCase";
import UpdateFileBase64Request from "./Presentation/Requests/UpdateFileBase64.request";
import UpdateFileBase64UseCase from "./Domain/UseCases/UpdateFileBase64.useCase";
import UpdateFileMultipartRequest from "./Presentation/Requests/UpdateFileMultipart.request";
import UpdateFileMultipartUseCase from "./Domain/UseCases/UpdateFileMultipart.useCase";
import UploadBase64UseCase from "./Domain/UseCases/UploadBase64.useCase";


@controller('/api/files')
export default class FileHandler
{
    @inject(Types.Responder)
    private responder: Responder;

    @httpGet('/', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new ListFilesRequest(req);
        await ValidatorRequest.handle(_request);

        const listFilesUseCase = new ListFilesUseCase();
        const paginator: IPaginator = await listFilesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        await ValidatorRequest.handle(_request);

        const listObjectsUseCase = new ListObjectsUseCase();
        const objects = await listObjectsUseCase.handle(_request);

        this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveFileBase64Request(req);
        await ValidatorRequest.handle(_request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        const file = await uploadBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPost('/', SaveFileMulterMiddleware.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SaveFileMultipartRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        const file = await uploadMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new SavePresignedFileRequest(req);
        await ValidatorRequest.handle(_request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const downloadUseCase = new DownloadUseCase();

        const fileDto = await downloadUseCase.handle(_request);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpPut('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateFileBase64Request(req);
        await ValidatorRequest.handle(_request);

        const updateFileBase64UseCase = new UpdateFileBase64UseCase();
        const file = await updateFileBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPut('/:id',SaveFileMulterMiddleware.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UpdateFileMultipartRequest(req);
        await ValidatorRequest.handle(_request);

        const updateFileMultipartUseCase = new UpdateFileMultipartUseCase();
        const file = await updateFileMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }
}

