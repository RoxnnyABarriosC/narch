
export default interface SaveUserPayload
{
    getFirstName(): string
    getLastName(): string;
    getEmail(): string;
    getPassword(): string;
    getPasswordConfirmation(): string;
    getEnable(): boolean;
    getRoles?(): any[];
    getPermissions?(): string[];
    getConfirmationToken(): null;
    getPasswordRequestedAt(): null;
    getIsSuperAdmin(): boolean;
}
