import IBaseEntityDomain from "../Shared/IBaseEntityDomain";

export default interface ITokenDomain extends IBaseEntityDomain
{
    hash: string;
    expires: number;
    payload: any;
    blackListed: boolean;
}

