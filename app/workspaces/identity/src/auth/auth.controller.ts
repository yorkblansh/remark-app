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

import { PrismaService } from '../prisma.service'
import { LoginDto } from './dto/login.dto'
import { RedisService } from '../redis/redis.service'
import { UserDataDto } from './dto/user.data.dto'
import { UserService } from '../user/user.service'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import * as O from 'fp-ts/lib/Option'

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
		pipe(
			userData,
			this.userService.findUser,
			E.map((user) =>
				user
					? E.right(this.redisService.setUserHash(user.login))
					: E.left(
							new HttpException(
								{
									status: HttpStatus.UNAUTHORIZED,
									error: 'user not found',
								},
								HttpStatus.UNAUTHORIZED,
								{ cause: Error('userrr nottt found') },
							),
					  ),
			),
		)
	}
}
