import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default interface ChangeMyPasswordPayload extends IdPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

