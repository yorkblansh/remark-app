import { Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [HttpModule],
	providers: [RedisService],
})
export class RedisModule {}
