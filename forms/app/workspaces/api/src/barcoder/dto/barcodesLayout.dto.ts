import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNumberString, IsString } from 'class-validator'

export class BarcodesLayoutDto {
	/**
	 * количество баркодов на странице
	 */
	@IsString()
	@ApiProperty({
		example: '60 (4*15)',
		description: 'количество баркодов на странице',
	})
	barcodesOnPage: '60 (4*15)'

	/**
	 * всего страниц
	 */
	@IsNumber()
	@ApiProperty({
		example: '5',
		description: 'всего страниц',
	})
	pageAmount: number

	/**
	 * index
	 */
	@IsNumberString()
	@ApiProperty({
		example: '299299',
		description: 'index',
	})
	index: string
}
