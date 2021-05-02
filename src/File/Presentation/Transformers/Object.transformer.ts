import Transformer from "../../../App/Presentation/Shared/Transformer";

export default class ObjectTransformer extends Transformer
{
    transform(object: any)
    {
        return {
            name: object.name,
            lastModified: this.unixDate(object.lastModified),
            etag: object.etag,
            size: object.size,
        };
    }    
}
