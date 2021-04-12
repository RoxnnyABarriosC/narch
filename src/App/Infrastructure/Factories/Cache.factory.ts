import CacheRedisRepository from "../Repositories/Redis/Cache.redis.repository";
import {ICacheRepository} from "@digichanges/shared-experience";

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return CacheRedisRepository.getInstance();
    }
}

export default CacheFactory;