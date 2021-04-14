import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default interface SaveRolePayload extends AuthUserPayload
{
    getName(): string;
    getSlug(): string;
    getPermissions(): string[];
    getEnable(): boolean;
}

