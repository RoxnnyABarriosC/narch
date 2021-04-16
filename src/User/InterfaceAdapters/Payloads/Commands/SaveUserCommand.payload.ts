
export default interface SaveUserCommandPayload
{
    getFirstName(): string
    getLastName(): string;
    getEmail(): string;
    getPassword(): string;
    getPasswordConfirmation(): string;
    getEnable(): boolean;
    getPermissions(): string[];
    getIsSuperAdmin(): boolean;
}
