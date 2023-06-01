import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString, IsString } from 'class-validator'
import { isNumericLiteral } from 'typescript'

export class BarcodeRangeDto {
	/**
	 * индекс отделения
	 */
	@IsNumberString()
	@ApiProperty({
		example: '292900',
		description: 'индекс отделения',
	})
	index: string

	/**
	 * количество штрих-кодов
	 */
	@IsNumber()
	@ApiProperty({
		example: 60,
		description: 'количество штрих-кодов',
	})
	amount: number

	/**
	 * postoffice_center
	 */
	@IsNumber()
	@ApiProperty({
		example: 'ЦПС №4 (Краснодон)',
		description: 'postoffice_center',
	})
	postoffice_center: string
}
