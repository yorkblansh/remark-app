import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { User } from '@prisma/client'
import { PrismaService } from '../prisma.service'

type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

@Injectable()
export class UserService {
	constructor(
		private readonly httpService: HttpService,
		private readonly prismaService: PrismaService,
	) {}

	async findUser(userToFind: Prettify<Omit<User, 'id'>>) {
		const { email, login, password } = userToFind
		let user: User

		try {
			return await this.prismaService.user.findFirst({
				where: {
					OR: [{ login }, { email }],
					AND: [{ password }],
				},
			})
		} catch (FIND_USER_PRISMA_ERROR) {
			console.log({ FIND_USER_PRISMA_ERROR })
		}
	}
}
