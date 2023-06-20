import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { PrismaService } from '../prisma.service'
import { pipe } from 'fp-ts/lib/function'
import * as E from 'fp-ts/lib/Either'
import { Prisma, User } from '@prisma/client'

type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export class FindUserDataError extends Error {
	constructor(private readonly userLogin: string) {
		super(`${userLogin} can not be found, db error`)
	}
}

@Injectable()
export class UserService {
	constructor(
		private readonly httpService: HttpService,
		private readonly prismaService: PrismaService,
	) {}

	findUser(
		userToFind: Prettify<Omit<User, 'id'>>,
	): E.Either<FindUserDataError, User> {
		const { email, login, password } = userToFind

		try {
			return pipe(
				this.prismaService.user.findFirst({
					where: {
						OR: [{ login }, { email }],
						AND: [{ password }],
					},
				}) as unknown as User,
				E.right,
			)
		} catch (FIND_USER_PRISMA_ERROR) {
			return E.left(new FindUserDataError(login))
			// console.log({ FIND_USER_PRISMA_ERROR })
		}
	}
}
