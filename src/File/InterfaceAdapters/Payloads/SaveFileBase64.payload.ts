import SaveFilePayload from "./SaveFile.payload";

export default interface SaveFileBase64Payload extends SaveFilePayload
{
    getBase64(): string,
}
