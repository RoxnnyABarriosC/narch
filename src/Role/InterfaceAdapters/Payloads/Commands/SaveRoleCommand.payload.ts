
export default interface SaveRoleCommandPayload
{
    getName(): string;
    getSlug(): string;
    getPermissions(): string[];
    getEnable(): boolean;
}

