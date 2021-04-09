import {loggerCli} from '../../../App/Infrastructure/Shared/Logger';
import commander from 'commander';
import SyncRolesPermissionUseCase from "../../../Auth/Domain/UseCases/SyncRolesPermission.useCase";

const SyncRolesPermissionCommand = new commander.Command('syncRolesPermission');

SyncRolesPermissionCommand
    .version('0.0.1')
    .description('Sync permissions')
    .action(async() => 
    {
        const syncRolesPermissionUseCase = new SyncRolesPermissionUseCase();
        await syncRolesPermissionUseCase.handle();

        loggerCli.info('Sync successfully.');
    });

export default SyncRolesPermissionCommand;
