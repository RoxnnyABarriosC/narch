import commander from 'commander';
import {loggerCli} from '../../Infrastructure/Shared/Logger';
import SaveUserUseCase from "../../../User/Domain/UseCases/SaveUser.useCase";
import SaveUserPayload from "../../../User/InterfaceAdapters/Payloads/SaveUser.payload";
import SaveUserCommandRequest from "../Requests/Command/Requests/SaveUserCommand.request";

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
    .option('-e, --email <email>', 'Email of user')
    .option('-fn, --firstName <firstName>', 'First Name of the user')
    .option('-ln, --lastName <lastName>', 'Last Name of the user')
    .option('-p, --password <password>', 'Password of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if User is Super Admin')
    .action(async(env) => 
    {
        const saveUserUseCase = new SaveUserUseCase();

        const userCommandRepRequest: SaveUserPayload = new SaveUserCommandRequest(env);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user)
        {
            loggerCli.info('User created successfully.');
        }
    });

export default AddUserCommand;
