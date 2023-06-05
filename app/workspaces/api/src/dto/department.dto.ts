import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DepartmentDto {
	/**
	 * номер отделения
	 */
	@IsString()
	@ApiProperty({
		example: '291001',
		description: 'номер отделения',
	})
	index: string
}
