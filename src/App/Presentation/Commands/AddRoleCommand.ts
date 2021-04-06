import commander from 'commander';
import {loggerCli} from '../../Infrastructure/Shared/Logger';
import SaveRolePayload from "../../../Role/InterfaceAdapters/Payloads/SaveRole.payload";
import SaveRoleUseCase from "../../../Role/Domain/UseCases/SaveRole.useCase";
import SaveRoleUserCommandRequest from "../Requests/Command/Requests/SaveRoleUserCommand.request";

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .version('0.0.1')
    .description('Add role to the system')
    .option('-n, --name <name>', 'Name of the role')
    .option('-s, --slug <slug>', 'Slug of the role')
    .action(async(env: any) => 
    {
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRepRequest: SaveRolePayload = new SaveRoleUserCommandRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRepRequest);

        if (role)
        {
            loggerCli.info('Role created successfully.');
        }
    });

export default AddRoleCommand;
