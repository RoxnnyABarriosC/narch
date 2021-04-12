import AuthUserPayload from "./AuthUser.payload";

export default interface IdPayload extends AuthUserPayload
{
    getId(): string;
}
