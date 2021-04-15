import Transformer from "../../../App/Presentation/Shared/Transformer";
import IToken from "../../../App/InterfaceAdapters/Shared/IToken";

export default class KeepAliveTransformer extends Transformer
{
    public transform(token: IToken)
    {
        return {
            expires: token.getExpires(),
            token: token.getHash()
        };
    }
}
