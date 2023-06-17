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
import { LoginDto } from './dto/login.dto'
import { RedisService } from '../redis/redis.service'
import { User } from '.prisma/client'
import { UserDataDto } from './dto/user.data.dto'
import { UserService } from '../user/user.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly genpdfService: AuthService,
		private readonly redisService: RedisService,
		private readonly userService: UserService,
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	@ApiOperation({ summary: 'login user' })
	async login(@Body() userData: LoginDto) {
		this.userService.findUser(userData)

		if (user) {
			const userHash = await this.redisService.setUserHash(user.login)
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

	@HttpCode(HttpStatus.OK)
	@Post('/user_data')
	@ApiOperation({ summary: 'user data' })
	async userData(@Body() userData: UserDataDto) {
		const { login, userHash } = userData
		const redisUserHash = await this.redisService.getUserHash(login)
		if (redisUserHash === userHash) {
			return
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
