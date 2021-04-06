import commander from 'commander';
import {loggerCli} from '../../Infrastructure/Shared/Logger';
import SaveUserUseCase from "../../../User/Domain/UseCases/SaveUser.useCase";
import SaveRoleUseCase from "../../../Role/Domain/UseCases/SaveRole.useCase";
import SaveRolePayload from "../../../Role/InterfaceAdapters/Payloads/SaveRole.payload";
import SaveUserPayload from "../../../User/InterfaceAdapters/Payloads/SaveUser.payload";
import SaveUserCommandRequest from "../Requests/Command/Requests/SaveUserCommand.request";
import SaveRoleUserCommandRequest from "../Requests/Command/Requests/SaveRoleUserCommand.request";



const AddUserRoleCommand = new commander.Command('addUserRole');

AddUserRoleCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-r, --role <role>', 'Name of the role')
    .option('-e, --email <email>', 'Email of user')
    .option('-fn, --firstName <firstName>', 'First Name of the user')
    .option('-ln, --lastName <lastName>', 'Last Name of the user')
    .option('-p, --password <password>', 'Password of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>', 'Set if User is Super Admin')
    .action(async(env: any) => 
    {
        const saveUserUseCase = new SaveUserUseCase();
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: SaveRolePayload = new SaveRoleUserCommandRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        const userCommandRepRequest: SaveUserPayload = new SaveUserCommandRequest(env, role);
        const user = await saveUserUseCase.handle(userCommandRepRequest);

        if (user && role)
        {
            loggerCli.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;
