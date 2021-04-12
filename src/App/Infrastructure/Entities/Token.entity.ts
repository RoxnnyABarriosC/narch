import ITokenDomain from "../../InterfaceAdapters/IInfraestructure/IToken.domain";
import BaseEntity from "../../Domain/Shared/Base.entity";

export default class TokenEntity extends BaseEntity implements ITokenDomain
{
    hash : string;
    expires: number;
    payload: any;
    blackListed: boolean;

    constructor()
    {
        super()
        this.hash = '';
        this.payload = {};
        this.expires = 0;
        this.blackListed = false;
    }
}
