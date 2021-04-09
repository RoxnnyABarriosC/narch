import lazyInject from "../../../LazyInject";
import {REPOSITORIES} from "../../../Repositories";
import CreateBucketPayload from "../../InterfaceAdapters/Payloads/CreateBucket.payload";
import FilesystemFactory from "../../../App/Infrastructure/Factories/Filesystem.factory";
import IFileRepository from "../../InterfaceAdapters/IFile.repository";

export default class CreateBucketUseCase
{
    @lazyInject(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        const bucketName = payload.getBucketName();
        const region = payload.getRegion();
        const bucketPolicy = payload.getBucketPolicy();

        const filesystem = FilesystemFactory.create();
        await filesystem.createBucket(bucketName, region);
        await filesystem.setBucketPolicy(bucketPolicy, bucketName);
    }
}
