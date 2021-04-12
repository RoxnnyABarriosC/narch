import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface ChangeUserPasswordPayload extends IdPayload
{
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}
