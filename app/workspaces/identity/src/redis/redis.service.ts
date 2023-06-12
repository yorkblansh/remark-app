import { Injectable } from '@nestjs/common'
// import { createClient } from 'redis'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
	private client: Redis

	constructor() {}

	onModuleInit() {
		this.client = new Redis({ host: 'redis' })
		// createClient({
		// 	url: 'redis://redis/0',
		// })

		this.client.set('var', 'varrr')
	}
}
