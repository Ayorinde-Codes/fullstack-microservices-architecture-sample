import Redis from 'ioredis'

class RedisClient {
  private client: Redis

  constructor() {
    const redisHost = process.env.REDIS_HOST || 'redis'
    const redisPort = parseInt(process.env.REDIS_PORT || '6379', 10)
    const password = process.env.REDIS_PASSWORD || 'password@123'

    this.client = new Redis({
      host: redisHost,
      port: redisPort,
      password: password,
    })
  }

  async set(key: string, value: string, expiration?: number): Promise<void> {
    await this.client.set(key, value)

    if (expiration) {
      await this.client.expire(key, expiration)
    }
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async keyExists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1
  }
}

export default new RedisClient()
