import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class DatamatrixRequestDto {
	/**
	 * номер накладной
	 */
	@IsString()
	@ApiProperty({
		example: '2919207900000397',
		description: 'Номер накладной',
	})
	barcode16: string
}
