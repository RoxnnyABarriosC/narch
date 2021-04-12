import { Tedis } from "tedis";
import {ICacheRepository} from "@digichanges/shared-experience";

export default class CacheRedisRepository implements ICacheRepository
{
    private redis: Tedis;
    private static instance: CacheRedisRepository;

    async createConnection(config: {})
    {
        this.redis = new Tedis(config);
    }

    static getInstance(): CacheRedisRepository
    {
        if (!CacheRedisRepository.instance)
        {
            CacheRedisRepository.instance = new CacheRedisRepository();
        }

        return CacheRedisRepository.instance;
    }

    async set(key: string, value: string, expires: number = null): Promise<any>
    {
        if (expires)
        {
            await this.redis.setex(key, expires, value);
        }
        else
        {
            await this.redis.set(key, value);
        }
    }

    async jset(key: string, value: any, expires: number | null = null): Promise<any>
    {
        console.log('key redis',key);
        if (expires)
        {
            await this.redis.setex(key, expires, JSON.stringify(value));
        }
        else
        {
            await this.redis.set(key, JSON.stringify(value));
        }
    }

    async jget(key: string): Promise<any>
    {
        const val: any = await this.redis.get(key);
        return JSON.parse(val);
    }

    async get(key: string): Promise<string | number>
    {
        return await this.redis.get(key);
    }

    async hset(key: string, value: {}): Promise<any>
    {
        await this.redis.hmset(key, value);
    }

    async hget(key: string, field: string | null = null): Promise<{}>
    {
        let value: {};

        if (field)
        {
            value = await this.redis.hget(key, field);
        }
        else
        {
            value = await this.redis.hgetall(key);
        }

        return value;
    }

    async cleanAll(): Promise<any>
    {
        await this.redis.command("FLUSHALL");
    }
}
