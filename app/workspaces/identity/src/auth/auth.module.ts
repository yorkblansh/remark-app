import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { HttpModule } from '@nestjs/axios'
import { PrismaService } from '../prisma.service'
import { RedisService } from '../redis/redis.service'

@Module({
	imports: [HttpModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, RedisService],
})
export class AuthModule {}
