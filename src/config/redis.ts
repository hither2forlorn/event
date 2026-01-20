import { Redis } from "ioredis";
import env from "./env";
class RedisService {
	private redis: Redis;
	constructor() {
		this.redis = new Redis({
			host: env.REDIS_HOST,
			port: env.REDIS_PORT as number,
			password: env.REDIS_PASSWORD,
			maxRetriesPerRequest: 3,
			lazyConnect: true,
		});
	}

	async get<T>(key: string): Promise<T | null> {
		const data = await this.redis.get(key);
		return data ? JSON.parse(data) : null;
	}

	async set(key: string, value: any, ttl: number = 3600): Promise<void> {
		await this.redis.setex(key, ttl, JSON.stringify(value));
	}

	async del(key: string): Promise<void> {
		await this.redis.del(key);
	}

	async cacheOrFetch<T>(
		key: string,
		fetchFn: () => Promise<T>,
		ttl: number = 3600
	): Promise<T> {
		const cached = await this.get<T>(key);
		if (cached) return cached;

		const data = await fetchFn();
		await this.set(key, data, ttl);
		return data;
	}
	async invalidate(pattern: string): Promise<void> {
		const keys = await this.redis.keys(pattern);
		if (keys.length > 0) {
			await Promise.all(keys.map((key: string) => this.del(key)));
		}
	}
}

const redisService = new RedisService();
export default redisService;
