import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default interface ChangeMyPasswordPayload extends AuthUserPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

