import {
	IsDefined,
	IsNotEmptyObject,
	IsObject,
	IsString,
	ValidateNested,
} from "class-validator"
import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

class NumberOfContainers {
	/**
	 * С отправлением первого килограма
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "С отправлением первого килограма",
	})
	readonly from_first_kilogram_departure: string

	/**
	 * ЕМС
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "EMS",
	})
	readonly ems: string

	/**
	 * Правительственные
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "Правительственные",
	})
	readonly government: string

	/**
	 * Международные
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "Международные",
	})
	readonly international: string

	/**
	 * Страховые
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "Страховые",
	})
	readonly insurance: string

	/**
	 * С заказной корреспонденции
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "С заказной корреспонденции",
	})
	readonly from_registered_correspondence: string

	/**
	 * С простой корреспонденции
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "С простой корреспонденции",
	})
	readonly with_simple_correspondence: string

	/**
	 * Вес (кг)
	 */
	@IsString()
	@ApiProperty({
		example: "0.309",
		description: "Вес (кг)",
	})
	readonly weight: string

	/**
	 * С печатью
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "С печатью",
	})
	readonly with_stamp: string

	/**
	 * Порожняя тара
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "Порожняя тара",
	})
	readonly empty_containers: string

	/**
	 * Группа РПО
	 */
	@IsString()
	@ApiProperty({
		example: "0",
		description: "Группа РПО",
	})
	readonly registered_mail_group: string
}

export class Form23ADto {
	/**
	 * dataMatrixBase64
	 */
	@IsString()
	@ApiProperty({
		example:
			"WB14eNoTUfxr8z,OK0e6W9oiJJWRwaCRgYOJkUFakdmBQ2ZVjEWUW7DO7ssMANHtCj8.",
		description: "dataMatrixBase64",
	})
	dataMatrixBase64: string

	/**
	 * dataMatrixBase64
	 */
	@IsString()
	@ApiProperty({
		example: "3449627910056598",
		description: "dataMatrixBase64",
	})
	barcodeBase64: string

	/**
	 * В сопровождении
	 */
	@IsString()
	@ApiProperty({ example: "дядя Вася", description: "имя сопровождающего" })
	readonly maintainer: string

	/**
	 * Форма 81
	 */
	@IsString()
	@ApiProperty({ example: "222", description: "номер формы" })
	readonly form_81: string

	/**
	 * Номер пломбы
	 */
	@IsString()
	@ApiProperty({ example: "0202", description: "номер пломбы" })
	readonly seal_number: string

	/**
	 * Номер транспортного средства
	 */
	@IsString()
	@ApiProperty({
		example: "вв 0101 вв",
		description: "Номер транспортного средства",
	})
	readonly vechicle_number: string

	/**
	 * Перпевозчик
	 */
	@IsString()
	@ApiProperty({
		example: "ЛугТранс",
		description: "ФИО либо Организация",
	})
	readonly transporter: string

	/**
	 * Номер накладной
	 */
	@IsString()
	@ApiProperty({
		example: "344962 79 1005659 8",
		description: "номер накладной",
	})
	readonly invoice_number: string

	/**
	 * Индекс отправительной почты
	 */
	@IsString()
	@ApiProperty({
		example: "344962 79 1005659 8",
		description: "номер накладной",
	})
	readonly outcome_mail_index: string

	/**
	 * Индекс входящей почты
	 */
	@IsString()
	@ApiProperty({
		example: "291920",
		description: "Индекс входящей почты",
	})
	readonly income_mail_index: string

	/**
	 * адресс входящей почты
	 */
	@IsString()
	@ApiProperty({
		example: "ЛУГАНСК ЦОПП",
		description: "адресс входящей почты",
	})
	readonly income_mail_adress: string

	/**
	 * Индекс почтовой емкости
	 */
	@IsString()
	@ApiProperty({
		example: "344962 79 1005660 4",
		description: "индекс почтовой емкости",
	})
	readonly postal_capacity_index: string

	/**
	 * Количество емкостей
	 */
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@ApiProperty({
		type: NumberOfContainers,
	})
	@Type(() => NumberOfContainers)
	readonly noc: NumberOfContainers

	/**
	 * Всего емкостей
	 */
	@IsString()
	@ApiProperty({
		example: "1",
		description: "Всего емкостей",
	})
	readonly total_capacities: string

	/**
	 * Всего РПО, пересылаемых открыто
	 */
	@IsString()
	@ApiProperty({
		example: "1",
		description: "Всего РПО, пересылаемых открыто",
	})
	readonly total_registered_mail_sent_openly: string

	/**
	 * Количество емкостей (суммы столбцов)
	 */
	@IsDefined()
	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@ApiProperty({
		type: NumberOfContainers,
	})
	@Type(() => NumberOfContainers)
	readonly noc_sum: NumberOfContainers // amount

	/**
	 * Всего емкостей (сумма)
	 */
	@IsString()
	@ApiProperty({
		example: "1",
		description: "Всего емкостей (сумма)",
	})
	readonly total_capacities_sum: string

	/**
	 * Всего РПО, пересылаемых открыто (сумма)
	 */
	@IsString()
	@ApiProperty({
		example: "1",
		description: "Всего РПО, пересылаемых открыто (сумма)",
	})
	readonly total_registered_mail_sent_openly_sum: string
}
