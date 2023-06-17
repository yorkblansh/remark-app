import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { PrismaService } from '../prisma.service'
import { RedisService } from '../redis/redis.service'

@Module({
	imports: [HttpModule],
	providers: [RedisService, PrismaService],
})
export class UserModule {}
