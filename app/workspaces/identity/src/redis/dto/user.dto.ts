import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsObject, IsString } from 'class-validator'

export class UserDto {
	/**
	 * email
	 */
	@IsEmail()
	@ApiProperty({
		example: 'email1@gmail.com',
		description: 'email',
	})
	email: string

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
	 * password
	 */
	@IsString()
	@ApiProperty({
		example: '111',
		description: 'password',
	})
	password: string
}
