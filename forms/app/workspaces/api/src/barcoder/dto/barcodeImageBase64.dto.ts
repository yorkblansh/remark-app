import { ApiProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

export class barcodeImageBase64Dto {
	// /**
	//  * index
	//  */
	// @IsNumberString()
	// @ApiProperty({
	// 	example: '29480182001210',
	// 	description: 'index',
	// })
	index: string[]
}
