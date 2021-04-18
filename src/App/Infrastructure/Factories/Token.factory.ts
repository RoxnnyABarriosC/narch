import Config from "config";
import { v4 as uuidv4 } from 'uuid';
import {ITokenRepository} from "@digichanges/shared-experience";

import TokenEntity from "../Entities/Token.entity";
import ContainerFactory from "./Container.factory";
import {REPOSITORIES} from "../../../Repositories";
import IToken from "../../InterfaceAdapters/Shared/IToken";
import IUserDomain from "../../../User/InterfaceAdapters/IUser.domain";
import JWTToken from "../../Shared/JWTToken";
import ITokenDomain from "../../InterfaceAdapters/IInfraestructure/IToken.domain";

// TODO: Change logic with payload to extend and add new payload
export default class TokenFactory
{
    private repository: ITokenRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<ITokenRepository>(REPOSITORIES.ITokenRepository)
    }

    public async createToken(user: IUserDomain): Promise<IToken>
    {
        const expires: number = Config.get('jwt.expires');
        const secret: string = Config.get('jwt.secret');
        const id = uuidv4();

        const jWTToken = new JWTToken(id, expires, user, secret);

        const token: ITokenDomain = new TokenEntity();
        token.setId(id);
        token.hash = jWTToken.getHash();
        token.payload = jWTToken.getPayload();
        token.expires = jWTToken.getExpires();

        await this.repository.save(token);

        return jWTToken;
    };
}
