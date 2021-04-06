
export default interface ForgotPasswordPayload
{
    getEmail(): string;
    getConfirmationToken(): Promise<string>;
    getPasswordRequestedAT(): Date;
}

