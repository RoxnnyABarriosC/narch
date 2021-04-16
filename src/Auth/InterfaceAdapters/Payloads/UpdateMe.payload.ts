import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default interface UpdateMePayload extends AuthUserPayload
{
    getFirstName(): string
    getLastName(): string;
    getEmail(): string;
    getMainPictureId(): string;
}