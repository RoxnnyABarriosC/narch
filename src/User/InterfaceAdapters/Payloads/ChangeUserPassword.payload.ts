import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default interface ChangeUserPasswordPayload extends IdPayload
{
    getNewPassword(): string;
    getNewPasswordConfirmation(): string;
}
