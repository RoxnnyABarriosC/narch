import SaveFilePayload from "./SaveFile.payload";

export default interface SaveFileMultipartPayload extends SaveFilePayload
{
    getFile(): Express.Multer.File
}
