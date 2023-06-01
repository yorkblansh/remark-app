import { Module } from '@nestjs/common'
import { BarcoderService } from './barcoder.service'
import { BarcoderController } from './barcoder.controller'
import { GenpdfModule } from '../genpdf/genpdf.module'
import { GenpdfService } from '../genpdf/genpdf.service'
import { HttpModule } from '@nestjs/axios'

@Module({
	controllers: [BarcoderController],
	providers: [BarcoderService, GenpdfService],
	imports: [GenpdfModule, HttpModule],
})
export class BarcoderModule {}
