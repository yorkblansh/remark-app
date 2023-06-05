import { Module } from '@nestjs/common'
import { GenpdfService } from './genpdf.service'
import { GenpdfController } from './genpdf.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [HttpModule],
	controllers: [GenpdfController],
	providers: [GenpdfService],
})
export class GenpdfModule {}
