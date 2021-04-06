import IdPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/IdPayload";

export default interface UpdateUserPayload extends IdPayload
{
    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getEnable(): boolean;
    getTokenUserId(): string;
    getPermissions(): string[];
}

