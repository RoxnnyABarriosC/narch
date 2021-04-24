import _ from "lodash";

export default class Permissions
{
    static readonly ALL: string = 'all';

    // AUTH
    static readonly KEEP_ALIVE: string = 'keepAlive';
    static readonly UPDATE_ME: string = 'updateMe';
    static readonly SHOW_ME: string = 'showMe';
    static readonly CHANGE_MY_PASSWORD: string = 'ChangeMyPassword';

    // USERS
    static readonly SAVE_USERS: string = 'saveUsers';
    static readonly UPDATE_USERS: string = 'updateUsers';
    static readonly SHOW_USERS: string = 'showUsers';
    static readonly LIST_USERS: string = 'listUsers';
    static readonly REMOVE_USERS: string = 'removeUsers';
    static readonly ASSING_ROLES_TO_USERS: string = 'assingRolesToUsers';
    static readonly ASSING_PERMISSIONS_TO_USERS: string = 'assingPermissionsToUsers';
    static readonly CHANGE_PASSWORDS_USERS:string = 'changePasswordsUsers';

    // FILES
    static readonly UPLOAD_FILES: string = 'uploadFiles';
    static readonly UPDATE_FILES: string = 'updateFiles';
    static readonly DOWNLOAD_FILES: string = 'downloadFiles';
    static readonly LIST_FILES: string = 'listFiles';

    // ROLES
    static readonly SAVE_ROLES: string = 'saveRoles';
    static readonly UPDATE_ROLES: string = 'updateRoles';
    static readonly SHOW_ROLES: string = 'showRoles';
    static readonly LIST_ROLES: string = 'listRoles';
    static readonly REMOVE_ROLES: string = 'removeRoles';

    // ITEMS
    static readonly SAVE_ITEMS: string = 'saveItems';
    static readonly UPDATE_ITEMS: string = 'updateItems';
    static readonly SHOW_ITEMS: string = 'showItems';
    static readonly LIST_ITEMS: string = 'listItems';
    static readonly REMOVE_ITEMS: string = 'removeItems';

    // LOGS
    static readonly SHOW_LOGS: string = 'showLogs';
    static readonly LIST_LOGS: string = 'listLogs';

    // OTHER
    static readonly SYNC_PERMISSIONS: string = 'syncPermissions';
    static readonly GET_PERMISSIONS: string = 'getPermissions';

    static groupPermissions(): {}
    {
        return {
            AUTH: [
                `${Permissions.KEEP_ALIVE}`,
                `${Permissions.UPDATE_ME}`,
                `${Permissions.SHOW_ME}`,
                `${Permissions.CHANGE_MY_PASSWORD}`,
            ],
            USERS: [
                `${Permissions.SAVE_USERS}`,
                `${Permissions.UPDATE_USERS}`,
                `${Permissions.SHOW_USERS}`,
                `${Permissions.LIST_USERS}`,
                `${Permissions.REMOVE_USERS}`,
                `${Permissions.CHANGE_PASSWORDS_USERS}`,
                `${Permissions.ASSING_PERMISSIONS_TO_USERS}`,
                `${Permissions.ASSING_ROLES_TO_USERS}`
            ],
            ROLES: [
                `${Permissions.SAVE_ROLES}`,
                `${Permissions.UPDATE_ROLES}`,
                `${Permissions.SHOW_ROLES}`,
                `${Permissions.LIST_ROLES}`,
                `${Permissions.REMOVE_ROLES}`,
            ],
            FILES: [
                `${Permissions.UPLOAD_FILES}`,
                `${Permissions.UPDATE_FILES}`,
                `${Permissions.DOWNLOAD_FILES}`
            ],
            ITEMS: [
                `${Permissions.SAVE_ITEMS}`,
                `${Permissions.UPDATE_ITEMS}`,
                `${Permissions.SHOW_ITEMS}`,
                `${Permissions.LIST_ITEMS}`,
                `${Permissions.REMOVE_ITEMS}`,
            ],
            LOGS: [
                `${Permissions.SHOW_LOGS}`,
                `${Permissions.LIST_LOGS}`,
            ],
            OTHER: [
                `${Permissions.SYNC_PERMISSIONS}`,
                `${Permissions.GET_PERMISSIONS}`,
            ]
        };
    }

    static permissions(): string[]
    {
        const permissions: string[] = [];

        _.map(Permissions.groupPermissions(), (group) => permissions.push(group));

        return _.flatMap(permissions);
    }

}
