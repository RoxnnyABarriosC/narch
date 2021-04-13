import _ from "lodash";

export default class Permissions
{
    static readonly ALL: string = 'all';

    // AUTH
    static readonly AUTH_KEEP_ALIVE: string = 'authKeepAlive';
    static readonly AUTH_SYNC_PERMISSIONS: string = 'authSyncPermissions';
    static readonly GET_PERMISSIONS: string = 'getPermissions';

    // USERS
    static readonly USERS_SAVE: string = 'usersSave';
    static readonly USERS_UPDATE: string = 'usersUpdate';
    static readonly USERS_SHOW: string = 'usersShow';
    static readonly USERS_LIST: string = 'usersList';
    static readonly USERS_REMOVE: string = 'usersRemove';
    static readonly USERS_ASSIGN_ROLE: string = 'usersAssignRole';
    static readonly USERS_CHANGE_MY_PASSWORD: string = 'usersChangeMyPassword';
    static readonly USERS_CHANGE_USER_PASSWORD:string = 'usersChangeUserPassword';

    // FILES
    static readonly FILES_UPLOAD: string = 'filesUpload';
    static readonly FILES_UPDATE: string = 'filesUpdate';
    static readonly FILES_DOWNLOAD: string = 'filesDownload';
    static readonly FILES_LIST: string = 'filesList';

    // ROLES
    static readonly ROLES_SAVE: string = 'rolesSave';
    static readonly ROLES_UPDATE: string = 'rolesUpdate';
    static readonly ROLES_SHOW: string = 'rolesShow';
    static readonly ROLES_LIST: string = 'rolesList';
    static readonly ROLES_REMOVE: string = 'rolesRemove';

    // ITEMS
    static readonly ITEMS_SAVE: string = 'itemsSave';
    static readonly ITEMS_UPDATE: string = 'itemsUpdate';
    static readonly ITEMS_SHOW: string = 'itemsShow';
    static readonly ITEMS_LIST: string = 'itemsList';
    static readonly ITEMS_REMOVE: string = 'itemsRemove';

    // LOGS
    static readonly LOGS_SHOW: string = 'logsShow';
    static readonly LOGS_LIST: string = 'logsList';

    static groupPermissions(): {}
    {
        return {
            OTHERS: [
                `${Permissions.AUTH_KEEP_ALIVE}`,
                `${Permissions.AUTH_SYNC_PERMISSIONS}`,
                `${Permissions.GET_PERMISSIONS}`,
            ],
            USERS: [
                `${Permissions.USERS_SAVE}`,
                `${Permissions.USERS_UPDATE}`,
                `${Permissions.USERS_SHOW}`,
                `${Permissions.USERS_LIST}`,
                `${Permissions.USERS_REMOVE}`,
                `${Permissions.USERS_CHANGE_MY_PASSWORD}`,
                `${Permissions.USERS_CHANGE_USER_PASSWORD}`,
            ],
            ROLES: [
                `${Permissions.ROLES_SAVE}`,
                `${Permissions.ROLES_UPDATE}`,
                `${Permissions.ROLES_SHOW}`,
                `${Permissions.ROLES_LIST}`,
                `${Permissions.ROLES_REMOVE}`,
            ],
            FILES: [
                `${Permissions.FILES_UPLOAD}`,
                `${Permissions.FILES_UPDATE}`,
                `${Permissions.FILES_DOWNLOAD}`
            ],
            ITEMS: [
                `${Permissions.ITEMS_SAVE}`,
                `${Permissions.ITEMS_UPDATE}`,
                `${Permissions.ITEMS_SHOW}`,
                `${Permissions.ITEMS_LIST}`,
                `${Permissions.ITEMS_REMOVE}`,
            ],
            LOGS: [
                `${Permissions.LOGS_SHOW}`,
                `${Permissions.LOGS_LIST}`,
            ],
        };
    }

    static permissions(): string[]
    {
        const permissions: string[] = [];

        _.map(Permissions.groupPermissions(), (group) => permissions.push(group));

        return _.flatMap(permissions);
    }

}
