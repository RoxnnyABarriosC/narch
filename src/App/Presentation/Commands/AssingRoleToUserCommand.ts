import commander from 'commander';
import {loggerCli} from '../../Infrastructure/Shared/Logger';
import AssignRoleBySlugUseCase from "../../../User/Domain/UseCases/AssignRoleBySlug.useCase";
import UserAssignRoleByPayload from "../../../User/InterfaceAdapters/Payloads/UserAssignRoleBy.payload";
import UserAssignRoleByCommandRequest from "../Requests/Command/Requests/UserAssignRoleByCommand.request";

const AssignRoleToUserCommand = new commander.Command('assignRoleToUser');

AssignRoleToUserCommand
    .version('0.0.1')
    .description('Assign role to user')
    .option('-s, --slug <slug>', 'Slug of the role')
    .option('-e, --email <email>', 'Email of the user')
    .action(async(env: any) => 
    {
        const assignRoleBySlugUseCase = new AssignRoleBySlugUseCase();

        const request: UserAssignRoleByPayload = new UserAssignRoleByCommandRequest(env);
        const user = await assignRoleBySlugUseCase.handle(request);

        if (user)
        {
            loggerCli.info('Assign user to role successfully.');
        }
    });

export default AssignRoleToUserCommand;
