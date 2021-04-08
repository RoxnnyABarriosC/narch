import commander from 'commander';
import {loggerCli} from '../../../App/Infrastructure/Shared/Logger';
import SaveRolePayload from "../../InterfaceAdapters/Payloads/SaveRole.payload";
import SaveRoleUseCase from "../../Domain/UseCases/SaveRole.useCase";
import SaveRoleCommandRequest from "../Requests/Commands/SaveRole.command.request";

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .passCommandToAction(false)
    .storeOptionsAsProperties(false)
    .version('0.0.1')
    .description('Add role to the system')
    .requiredOption('-n, --name <name>', 'Name of the role')
    .requiredOption('-s, --slug <slug>', 'Slug of the role')
    .action(async(env: any) => 
    {
        const saveRoleUseCase = new SaveRoleUseCase();

        const roleCommandRequest: SaveRolePayload = new SaveRoleCommandRequest(env);
        const role = await saveRoleUseCase.handle(roleCommandRequest);

        if (role)
        {
            loggerCli.info('Role created successfully.');
        }
    });

export default AddRoleCommand;
