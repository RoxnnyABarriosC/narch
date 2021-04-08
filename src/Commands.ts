#!/usr/bin/env ts-node

import {exit} from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import {loggerCli} from "./App/Infrastructure/Shared/Logger";

import AddUserCommand from "./User/Presentation/Commands/AddUser.command";
import AddRoleCommand from "./Role/Presentation/Commands/AddRole.command";
import AssignRoleToUserCommand from "./Role/Presentation/Commands/AssingRoleToUser.command";
import CreateVapIDCommand from "./App/Presentation/Commands/CreateVapID.command";
import SyncRolesPermissionCommand from "./Role/Presentation/Commands/SyncRolesPermission.command";
import CreateBucketCommand from "./File/Presentation/Commands/CreateBucket.command";
import {validateEnv} from "./Config/validateEnv";
import DatabaseFactory from "./App/Infrastructure/Factories/Database.factory";

(async() => 
{
    try 
    {
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection = databaseFactory.create();
        createConnection.initConfig();

        await createConnection.create();

        const program = commander.program;

        program.addCommand(AddRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AssignRoleToUserCommand);
        program.addCommand(SyncRolesPermissionCommand);
        program.addCommand(CreateVapIDCommand);
        program.addCommand(CreateBucketCommand);

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        loggerCli.info('Error while connecting to the database', error);
        loggerCli.info(error.message);
        exit();
    }
})();
