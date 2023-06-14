import { Injectable } from '@nestjs/common'
// import { createClient } from 'redis'
import Redis from 'ioredis'
import { createHmac } from 'node:crypto'

@Injectable()
export class RedisService {
	private client: Redis

	constructor() {}

	onModuleInit() {
		this.client = new Redis({ host: 'redis' })

		this.client.set('var', 'varrr')
	}

	setOnLoginTempKey(login: string) {
		const hash = createHmac('sha256', login + new Date().toUTCString())
		const stringHash = String(hash)

		this.client.set(`user:key:${login}`, stringHash)
	}
}
