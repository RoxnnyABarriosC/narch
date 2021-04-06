
export default interface ChangeForgotPasswordPayload
{
    getConfirmationToken(): string;
    getPassword(): Promise<string>;
    getPasswordConfirmation(): string;
}
