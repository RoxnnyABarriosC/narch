import IPaginator from "../../InterfaceAdapters/Shared/IPaginator";
import Transformer from "./Transformer";

export default class PaginatorTransformer extends Transformer
{
    public transform(paginator: IPaginator)
    {
        return {
            total: paginator.getTotal(),
            currentUrl: paginator.getCurrentUrl(),
            nextUrl: paginator.getNextUrl(),
        };
    }
}
