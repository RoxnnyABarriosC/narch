import commander from 'commander';
import {loggerCli} from '../../../App/Infrastructure/Shared/Logger';
import CreateBucketUseCase from "../../Domain/UseCases/CreateBucket.useCase";
import CreateBucketPayload from "../../InterfaceAdapters/Payloads/CreateBucket.payload";
import CreateBucketCommandRequest from "../Requests/Commands/CreateBucket.command.request";

const CreateBucketCommand = new commander.Command('createBucket');

CreateBucketCommand
    .version('0.0.1')
    .description('Add bucket to the system')
    .option('-b, --bucketName <bucketName>', 'Name of the bucket')
    .option('-r, --region <region>', 'Region of the bucket')
    .action(async(env: any) => 
    {
        const useCase = new CreateBucketUseCase();
        const bucketCommandRequest: CreateBucketPayload = new CreateBucketCommandRequest(env);

        await useCase.handle(bucketCommandRequest);

        loggerCli.info('Bucket was created successfully');
    });

export default CreateBucketCommand;
