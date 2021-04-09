import Config from "config";
import {injectable} from "inversify";
import {ICacheRepository, ITokenRepository} from "@digichanges/shared-experience";

import NotFoundException from "../Exceptions/NotFound.exception";
import CacheFactory from "../Factories/Cache.factory";
import ITokenDomain from "../../InterfaceAdapters/IInfraestructure/ITokenDomain";
import TokenEntity from "../Entities/Token.entity";

@injectable()
export default class TokenRedisRepository implements ITokenRepository
{
    private readonly repository: ICacheRepository;
    private readonly expire: number = Math.floor((+Config.get('jwt.expires') + 10) * 60);

    constructor()
    {
        this.repository = CacheFactory.createRedisCache();
    }

    async save (token: TokenEntity): Promise<ITokenDomain>
    {
        await this.repository.jset(token._id, token, this.expire);
        return token;
    }

    async update(token: TokenEntity): Promise<ITokenDomain>
    {
        await this.repository.jset(token._id, token);
        return token;
    }

    async getOne(id: string): Promise<ITokenDomain>
    {
        const token = await this.repository.jget(id);

        if (!token)
        {
            throw new NotFoundException(TokenEntity.name.replace('Entity',''));
        }

        return token;
    }
}
