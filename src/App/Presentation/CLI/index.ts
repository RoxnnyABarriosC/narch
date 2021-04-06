#!/usr/bin/env node

import {exit} from 'shelljs';
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

import {loggerCli} from "../../Infrastructure/Shared/Logger";

import initCommand from './initCommand';
import AddUserRoleCommand from "./Commands/AddUserRole/AddUserRole.command";
import AddUserCommand from "./Commands/AddUser/AddUser.command";
import AddRoleCommand from "./Commands/AddRole/AddRole.command";
import AssignRoleToUserCommand from "./Commands/AssingRoleToUser/AssingRoleToUser.command";
import CreateVapIDCommant from "./Commands/CreateVapID/CreateVapID.commant";
import SyncRolesPermissionCommand from "./Commands/SyncRolesPermission/SyncRolesPermission.command";
import CreateBucketCommand from "./Commands/CreateBucket/CreateBucket.command";

(async() => 
{
    try 
    {
        await initCommand();

        const program = commander.program;

        program.addCommand(AddUserRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AddRoleCommand);
        program.addCommand(AssignRoleToUserCommand);
        program.addCommand(CreateVapIDCommant);
        program.addCommand(SyncRolesPermissionCommand);
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
