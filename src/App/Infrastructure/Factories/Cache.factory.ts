import CacheRedisRepository from "../Repositories/Redis/Cache.redis.repository";
import {ICacheRepository} from "@digichanges/shared-experience";

export default class CacheFactory
{
    static createRedisCache(): ICacheRepository
    {
        return CacheRedisRepository.getInstance();
    }
}
