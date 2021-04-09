import commander from 'commander';
import {loggerCli} from '../../../App/Infrastructure/Shared/Logger';
import AssignRoleBySlugUseCase from "../../../User/Domain/UseCases/AssignRoleBySlug.useCase";
import UserAssignRoleByPayload from "../../../User/InterfaceAdapters/Payloads/UserAssignRoleBy.payload";
import AssignRoleToUserCommandRequest from "../Requests/Commands/AssignRoleToUser.command.request";

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .requiredOption('-s, --slug <slug>', 'Slug of the role')
    .requiredOption('-e, --email <email>', 'Email of the user')
    .action(async(env: any) => 
    {
        const assignRoleBySlugUseCase = new AssignRoleBySlugUseCase();

        const roleCommandRequest: UserAssignRoleByPayload = new AssignRoleToUserCommandRequest(env);
        const user = await assignRoleBySlugUseCase.handle(roleCommandRequest);

        if (user)
        {
            loggerCli.info('Assign user to role successfully.');
        }
    });

export default AssignRoleToUserCommand;
