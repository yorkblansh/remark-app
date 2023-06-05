import {
	IsArray,
	IsDefined,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsString,
	ValidateNested,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { getBarcodes } from 'src/utils/getBarcodes'
import { GenericFormDto } from './generic.form.dto'
import _ from 'lodash'

/**
 * Тип посылки
 * как в примере - вместо "Группа РПО"
 */
enum BagType {
	'Прогнозируемая емкость' = 0,
	'Контейнер' = 1,
	'Мешок' = 2,
	'Ящик' = 3,
	'Постпакет' = 4,
	'Группа РПО' = 5,
	'Паллета' = 6,
	'Лоток' = 7,
	'Мешок М' = 8,
	'Открытая международная посылка' = 9,
	'Коробка' = 10,
	'Газетная пачка' = 11,
	'Мешок с МПО' = 12,
	'Группа ПТ' = 13,
	'Посылки' = 14,
}

class Packages {
	/**
	 * Коды отметок внутренних и международных отправлений
	 * особые отметки
	 * postmark
	 */
	@IsString()
	@ApiProperty({
		example: '4398046511104',
		description: 'Коды отметок внутренних и международных отправлений',
	})
	readonly rpiMark: string

	/**
	 * Сумма объявленной ценности
	 * Сумма объявленной ценности (ОЦ)
	 *  должна быть записана в копейках.
	 *  Значение должно записываться целым числом,
	 *  при этом два младших разряда должны быть значением копеек.
	 *
	 * Сумма объявленной ценности (руб.)
	 */
	@IsString()
	@ApiProperty({
		example: '21474836',
		description:
			'Сумма объявленной ценности (ОЦ) должна быть записана в копейках. Значение должно записываться целым числом, при этом два младших разряда должны быть значением копеек.',
	})
	readonly rpiValue: string

	/**
	 * Идентификатор почтового отпр. или перевода
	 */
	@IsString()
	@ApiProperty({
		example: '3449627910056611',
		description:
			'Внутренний ШПИ Международный ШПИ стандарта S10 ВПС ШИ почтовых вещей Зарезервировано для специальных ШИ',
	})
	readonly rpiBarCode: string

	/**
	 * RpiBarCode | ШИ вложение
	 * Внутренний ШПИ
	 * Международный ШПИ стандарта S10 ВПС
	 * ШИ почтовых вещей
	 * Зарезервировано для специальных ШИ
	 * идентификатор почт отправления
	 *
	 * Наименование почтового отправления
	 */
	@IsString()
	@ApiProperty({
		example: '3449627910056611',
		description:
			'Внутренний ШПИ Международный ШПИ стандарта S10 ВПС ШИ почтовых вещей Зарезервировано для специальных ШИ',
	})
	readonly rpiName: string
}

export class Form16Dto extends GenericFormDto implements GenericFormDto {
	/**
	 * datamatrix object contains img base 64 string and img size: small or big
	 */
	@IsObject()
	@ApiProperty({
		example: {},
		description: 'dataMatrix',
	})
	dataMatrix: {
		imgSize: 'small' | 'big'
		imgBase64: string
	}

	/**
	 * dataMatrixBase64
	 */
	@IsString()
	@ApiProperty({
		example:
			'WB14eNp7oJNiu3gB854DudZRmomMEWGBDhI5BxkUEhRAICEhAcqCAxZHgeulseJtiTdKBYFsMOqZ0NEhMBFIgAAHAzJQ8ZwERQdjJbhruNWYihskD-E4cgfw3xBewX6FObhpsUsWg24Bxw-2GsZLDFsaLA,IM-B-YK3gSmBh4IBC7IADOzwz9VCi5ncQETKVKVEzcWpRGJC1KFwzZapQGJDLFKYpM60pQZMDN-EpUmmhmlAWRcQjg4-MZ3h8I55apbeZrymaa5zMErnz3EzB3YzbX5258KUhujTtwqYDa62Mf0Q-CJsryWVQsPocT0zayrj0Y,u2haw3Zn6Rtur6TMU1xldfn5nRbVxZlpayeIONtbGUzmzReZLG085yneexOJ3Wmn5sburmQ8aHL22KfDhTMf-mmg9nTmzPCatIq4gx07YxjtMDKTebD1Tes-g8UDnb7XSgcuYjuQyPpjBekGK06GQqMOZ5kCbhcFP4wKochqhQBst7jFpXWf98Z9vBzcDCwKDAzODAxtDAw8AgycBgxMCQwsBwgoFhAiOqxBFN5jWn2BaEsk54LPtgvzkDAAEXv4g.',
		description: 'dataMatrixBase64',
	})
	dataMatrixBase64: string

	/**
	 * dataMatrixBase64
	 */
	@IsString()
	@ApiProperty({
		example: '3449627910056598',
		description: 'dataMatrixBase64',
	})
	barcodeBase64: string

	/**
	 * Тип пересылки
	 */
	@IsString()
	@ApiProperty({
		example: 'РПО',
		description: 'Тип пересылки',
	})
	readonly sendType: string

	/**
	 * Номер накладной
	 */
	@IsString()
	@ApiProperty({
		example: '3449627910056611',
		description: 'номер накладной | должен быть без пробелов',
	})
	readonly barcode: string

	// /**
	//  * Свойство тары
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "2023-02-09T09:05:00.000Z",
	// 	description:
	// 		"Коды свойств тары в соответствии с РТМ 0025 (п.3.4.4) [4]. Для записи кода свойств тары выделяется 4 бита, что позволит записать максимум 15 кодов свойств тары.",
	// })
	// readonly bagProp: string

	// /**
	//  * Тип тары
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "2023-02-09T09:05:00.000Z",
	// 	description: "Тип тары",
	// })
	// readonly bagType: string

	/**
	 * Дата создания накладной
	 */
	@IsString()
	@ApiProperty({
		example: '2023-02-09T09:05:00.000Z',
		description: 'Дата создания накладной',
	})
	readonly date: string

	/**
	 * Номер пломбы
	 */
	@IsString()
	@ApiProperty({ example: '0202', description: 'номер пломбы' })
	readonly sealNumber: string

	/**
	 * Индекс отправительной почты
	 */
	@IsString()
	@ApiProperty({
		example: '344962',
		description: 'номер накладной',
	})
	readonly indexFrom: string

	/**
	 * Индекс входящей почты
	 */
	@IsString()
	@ApiProperty({
		example: '291920',
		description: 'Индекс входящей почты',
	})
	readonly indexTo: string

	// /**
	//  * Номер пломбы
	//  */
	// @IsString()
	// @ApiProperty({ example: "0202", description: "номер пломбы" })
	// readonly seal_number: string

	// /**
	//  * Группа РПО
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "0",
	// 	description: "Группа РПО",
	// })
	// readonly registeredMailGroup: string

	/**
	 * packages
	 */
	@IsDefined()
	// @IsNotEmptyObject()
	@IsArray()
	// @IsObject({})
	@ValidateNested()
	@ApiProperty({
		type: [Packages],
		example: _.range(170).map((v, i) => ({
			rpiBarCode: i + '',
			rpiMark: 'Д' + i,
			rpiName: 'ПОС' + i,
			rpiValue: i + '',
		})),
	})
	@Type(() => Packages)
	readonly packages: Packages[]

	////////////////////////////////////////////////////////////

	// /**
	//  * адресс входящей почты
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "ЛУГАНСК ЦОПП",
	// 	description: "адресс входящей почты",
	// })
	// readonly income_mail_adress: string

	// /**
	//  * Индекс почтовой емкости
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "344962 79 1005660 4",
	// 	description: "индекс почтовой емкости",
	// })
	// readonly postal_capacity_index: string

	// /**
	//  * Всего емкостей
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "1",
	// 	description: "Всего емкостей",
	// })
	// readonly total_capacities: string

	// /**
	//  * Всего РПО, пересылаемых открыто
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "1",
	// 	description: "Всего РПО, пересылаемых открыто",
	// })
	// readonly total_registered_mail_sent_openly: string

	// /**
	//  * Всего емкостей (сумма)
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "1",
	// 	description: "Всего емкостей (сумма)",
	// })
	// readonly total_capacities_sum: string

	// /**
	//  * Всего РПО, пересылаемых открыто (сумма)
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: "1",
	// 	description: "Всего РПО, пересылаемых открыто (сумма)",
	// })
	// readonly total_registered_mail_sent_openly_sum: string
}
