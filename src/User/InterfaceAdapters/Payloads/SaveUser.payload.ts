import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default interface SaveUserPayload extends AuthUserPayload
{
    getFirstName(): string
    getLastName(): string;
    getEmail(): string;
    getPassword(): string;
    getPasswordConfirmation(): string;
    getEnable(): boolean;
    getRoles(): any[];
    getPermissions(): string[];
    getIsSuperAdmin(): boolean;
    getMainPictureId(): string;
}
