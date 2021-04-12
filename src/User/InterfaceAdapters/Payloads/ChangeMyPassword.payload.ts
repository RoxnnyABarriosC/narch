import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface ChangeMyPasswordPayload extends IdPayload
{
    getCurrentPassword(): string;
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}

