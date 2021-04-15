import commander from 'commander';
import {loggerCli} from '../../../App/Infrastructure/Shared/Logger';
import SaveUserPayload from "../../InterfaceAdapters/Payloads/SaveUser.payload";
import SaveUserCommandRequest from "../Requests/Commands/SaveUser.command.request";
import SaveUserCommandUseCase from "../../Domain/UseCases/Commands/SaveUserCommand.useCase";

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
    .requiredOption('-e, --email <email>', 'Email of user')
    .requiredOption('-fn, --firstName <firstName>', 'First Name of the user')
    .requiredOption('-ln, --lastName <lastName>', 'Last Name of the user')
    .requiredOption('-p, --password <password>', 'Password of the user')
    .requiredOption('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if User is Super Admin')
    .action(async(env) => 
    {

        const saveUserUseCase = new SaveUserCommandUseCase();
        const userCommandRequest: SaveUserPayload = new SaveUserCommandRequest(env);

        const user = await saveUserUseCase.handle(userCommandRequest);

        if (user)
        {
            loggerCli.info('User created successfully.');
        }
    });

export default AddUserCommand;
