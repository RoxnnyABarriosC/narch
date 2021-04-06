
export default interface SaveFilePayload
{
    getName(): string,
    getOriginalName(): string,
    getMimeType(): string,
    getPath(): string,
    getExtension(): string,
    getSize(): number,
}

