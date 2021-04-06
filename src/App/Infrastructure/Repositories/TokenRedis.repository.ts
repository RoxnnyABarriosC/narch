import Config from "config";
import {injectable} from "inversify";
import {ICacheRepository, ITokenRepository} from "@digichanges/shared-experience";

import NotFoundException from "../Exceptions/NotFound.exception";
import CacheFactory from "../Factories/Cache.factory";
import ITokenDomain from "../../InterfaceAdapters/IInfraestructure/ITokenDomain";

@injectable()
export default class TokenRedisRepository implements ITokenRepository
{
    private readonly repository: ICacheRepository;
    private readonly expire: number = Math.floor((+Config.get('jwt.expires') + 10) * 60);

    constructor()
    {
        this.repository = CacheFactory.createRedisCache();
    }

    async save (token: ITokenDomain): Promise<ITokenDomain>
    {
        await this.repository.jset(token.getId(), token, this.expire);
        return token;
    }

    async update(token: ITokenDomain): Promise<ITokenDomain>
    {
        await this.repository.jset(token.getId(), token);
        return token;
    }

    async getOne(id: string): Promise<ITokenDomain>
    {
        const token = await this.repository.jget(id);

        if (!token)
        {
            throw new NotFoundException('TokenEntity');
        }

        return token;
    }
}
