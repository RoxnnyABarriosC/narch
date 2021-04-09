import ListObjectsPayload from "../../InterfaceAdapters/Payloads/ListObjectsPayload";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";

export default class ListObjectsUseCase
{
    async handle(payload: ListObjectsPayload): Promise<any>
    {
        const filesystem = FilesystemFactory.create();
        return await filesystem.listObjects(payload.getPrefix(), payload.getRecursive());
    }
}

