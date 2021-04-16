import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/Id.payload";

export default interface UpdateUserPayload extends IdPayload
{
    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getEnable(): boolean;
    getTokenUserId(): string;
    getPermissions(): string[];
    getMainPictureId(): string;
}

