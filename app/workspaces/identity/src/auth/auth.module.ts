import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { HttpModule } from '@nestjs/axios'
import { PrismaService } from '../prisma.service'

@Module({
	imports: [HttpModule],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
})
export class AuthModule {}
