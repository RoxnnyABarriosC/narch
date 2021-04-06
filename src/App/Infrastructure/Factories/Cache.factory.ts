import RedisCacheRepository from "../Repositories/RedisCache.repository";
import {ICacheRepository} from "@digichanges/shared-experience";

class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return RedisCacheRepository.getInstance();
    }
}

export default CacheFactory;