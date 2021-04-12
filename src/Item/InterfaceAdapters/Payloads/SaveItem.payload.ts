import AuthUserPayload from "../../../App/InterfaceAdapters/Payloads/Defaults/AuthUser.payload";

export default interface SaveItemPayload extends AuthUserPayload
{
    getId(): string;
    getName(): string;
}

