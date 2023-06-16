import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsObject, IsString } from 'class-validator'

export class UserDataDto {
	/**
	 * login
	 */
	@IsString()
	@ApiProperty({
		example: '111',
		description: 'login',
	})
	login: string

	/**
	 * userHash
	 */
	@IsString()
	@ApiProperty({
		example: '1112',
		description: 'userHash',
	})
	userHash: string
}
