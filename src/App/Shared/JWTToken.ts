import moment from "moment";
import jwt from "jwt-simple";
import Config from "config";
import IUserDomain from "../../User/InterfaceAdapters/IUser.domain";
import IToken from "../InterfaceAdapters/Shared/IToken";
import ITokenDecode from "../InterfaceAdapters/Shared/ITokenDecode";

export default class JWTToken implements IToken
{
    private readonly expires: number;
    private readonly hash: string;
    private readonly user: IUserDomain;
    private readonly payload: ITokenDecode;

    constructor(id: string, expires: number, user: IUserDomain, secret: string)
    {
        this.user = user;
        this.expires = moment().utc().add({ minutes: expires }).unix();
        this.payload = {
            id,
            iss: Config.get('jwt.iss'),
            aud: Config.get('jwt.aud'),
            sub: user.email,
            iat: this.expires,
            exp: this.expires,
            userId: user.getId(),
            email: user.email
        };
        this.hash = jwt.encode(this.payload, secret, 'HS512');
    }

    getExpires(): number
    {
        return this.expires;
    }

    getHash(): string
    {
        return this.hash;
    }

    getPayload(): any
    {
        return this.payload;
    }

    getUser(): IUserDomain
    {
        return this.user;
    }
}