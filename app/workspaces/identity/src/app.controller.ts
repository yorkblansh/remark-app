import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma.service'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly prismaService: PrismaService,
	) {}

	@Get()
	// @Redirect('http://localhost/api', 301)
	getHello() {
		return 'sss'
	}
}
