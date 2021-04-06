import commander from 'commander';
import {loggerCli} from '../../Infrastructure/Shared/Logger';
import CreateBucketUseCase from "../../../File/Domain/UseCases/CreateBucket.useCase";
import CreateBucketPayload from "../../../File/InterfaceAdapters/Payloads/CreateBucket.payload";
import CreateBucketCommandRequest from "../Requests/Command/Requests/CreateBucketCommand.request";

const CreateBucketCommand = new commander.Command('createBucket');

CreateBucketCommand
    .version('0.0.1')
    .description('Add bucket to the system')
    .option('-b, --bucketName <bucketName>', 'Name of the bucket')
    .option('-r, --region <region>', 'Region of the bucket')
    .action(async(env: any) => 
    {
        const useCase = new CreateBucketUseCase();
        const request: CreateBucketPayload = new CreateBucketCommandRequest(env);

        await useCase.handle(request);

        loggerCli.info('Bucket was created successfully');
    });

export default CreateBucketCommand;
