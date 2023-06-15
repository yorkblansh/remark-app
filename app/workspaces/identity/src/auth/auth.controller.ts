import {
	Controller,
	Body,
	Res,
	Post,
	Get,
	HttpException,
	HttpStatus,
	HttpCode,
	Header,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { FORMS } from '../../../react/src/@generated/forms.enum'
import * as express from 'express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Form23ADto } from './dto/form23a.dto'
import { Form16Dto } from './dto/form16.dto'
import { PrismaService } from '../prisma.service'
import { UserDto } from './dto/user.dto'
import { RedisService } from '../redis/redis.service'
import { User } from '.prisma/client'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly genpdfService: AuthService,
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	@ApiOperation({ summary: 'login user' })
	async login(@Body() userData: UserDto) {
		const { email, login, password } = userData
		let user: User

		try {
			user = await this.prismaService.user.findFirst({
				where: {
					OR: [{ login }, { email }],
					AND: [{ password }],
				},
			})
		} catch (FIND_USER_PRISMA_ERROR) {
			console.log({ FIND_USER_PRISMA_ERROR })
		}

		if (user) {
			const userHash = await this.redisService.setOnLoginTempKey(user.login)
			return { userHash }
		} else {
			throw new HttpException(
				{
					status: HttpStatus.UNAUTHORIZED,
					error: 'user not found',
				},
				HttpStatus.UNAUTHORIZED,
				{ cause: Error('userrr nottt found') },
			)
		}
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
