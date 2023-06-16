import { Injectable } from '@nestjs/common'
// import { createClient } from 'redis'
import Redis from 'ioredis'
import { createHash, createHmac } from 'node:crypto'

@Injectable()
export class RedisService {
	private client: Redis

	constructor() {}

	onModuleInit() {
		this.client = new Redis({ host: 'redis' })

		this.client.set('var', 'varrr')
	}

	async setUserHash(login: string) {
		const hash = createHmac('sha256', login + new Date().toUTCString()).digest(
			'hex',
		)

		await this.client.set(`user:temp_key:${login}`, hash)

		setTimeout(() => {
			this.client.del(`user:temp_key:${login}`)
		}, 1000000)

		return hash
	}

	async getUserHash(login: string) {
		const userHash = await this.client.get(login)
		return userHash
	}
}
