import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { PrismaService } from './prisma.service'
import { RedisModule } from './redis/redis.module'

@Module({
	imports: [AuthModule, RedisModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
