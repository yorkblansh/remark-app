import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

console.log({
	import_meta_env: import.meta.env,
	process_env: process.env,
})

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.enableCors({ origin: '*' })
	app.useGlobalPipes(new ValidationPipe({ transform: true }))

	const config = new DocumentBuilder()
		.setTitle('index.pdf')
		.setDescription('Gen Pdf API description')
		.setVersion('0.1')
		.addTag('genpdf')
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document)

	await app.listen(5040)
}
bootstrap()

export const viteNodeApp = NestFactory.create(AppModule)
