import { Controller, Body, Res, Post, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { FORMS } from '../../../react/src/@generated/forms.enum'
import * as express from 'express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Form23ADto } from './dto/form23a.dto'
import { Form16Dto } from './dto/form16.dto'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly genpdfService: AuthService,
		private readonly prismaService: PrismaService,
	) {}

	@Post('/login')
	@ApiOperation({ summary: 'login user' })
	async login(@Body() userData: UserDto) {
		const { email, login, password } = userData
		const user = await this.prismaService.user.findFirst({
			where: {
				OR: [{ login }, { email }],
				AND: [{ password }],
			},

			// include: { files: true },
		})

		// const files = await Promise.all(
		// 	user.files.map(
		// 		async ({ fileId }) =>
		// 			await this.prismaService.file.findUnique({ where: { id: fileId } }),
		// 	),
		// )

		console.dir({ user }, { depth: null })
	}

	@Post('/' + FORMS.form16)
	@ApiOperation({ summary: 'get PDF' })
	@ApiResponse({ status: 200 })
	async [FORMS.form16](
		@Body() variables: Form16Dto,
		@Res() response: express.Response,
	) {
		response.setHeader('Content-Disposition', 'attachment; filename=form16.pdf')
		this.genpdfService
			.generateDocument({
				returnFormat: 'pdf',
				documentType: 'form16',
				variables,
			})
			.then((pdf) => {
				pdf.pipe(response)
			})
	}
}
