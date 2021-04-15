import Permissions from "./Permissions";

export default class Roles
{
    static readonly SUPER_ADMIN: string = 'SuperAdmin';
    static readonly ADMIN: string = 'Admin';
    static readonly OPERATOR: string = 'Operator';

    static getRoles(): any
    {
        return {
            [Roles.SUPER_ADMIN]: [
                Permissions.ALL
            ],
            [Roles.ADMIN]: [
                Permissions.ALL
            ],
            [Roles.OPERATOR]: [
                Permissions.CHANGE_MY_PASSWORD,
                Permissions.SAVE_ITEMS,
                Permissions.UPDATE_ITEMS,
                Permissions.SHOW_ITEMS,
                Permissions.LIST_ITEMS,
                Permissions.UPLOAD_FILES,
                Permissions.DOWNLOAD_FILES,
                Permissions.LIST_FILES,
                Permissions.UPDATE_ME,
                Permissions.KEEP_ALIVE,
                Permissions.SHOW_ME,
            ]
        };
    }
}
