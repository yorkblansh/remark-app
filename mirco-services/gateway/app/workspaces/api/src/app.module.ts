import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GenpdfModule } from './genpdf/genpdf.module'
import { BarcoderModule } from './barcoder/barcoder.module';

@Module({
	imports: [GenpdfModule, BarcoderModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
