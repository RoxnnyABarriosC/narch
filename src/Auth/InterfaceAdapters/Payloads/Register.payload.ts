
export default interface RegisterPayload
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
}