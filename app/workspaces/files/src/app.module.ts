import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GenpdfModule } from './genpdf/genpdf.module'

@Module({
	imports: [GenpdfModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
