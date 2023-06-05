import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class Item {
	RpiBarcode: string | number
	Weight: number
	MailType: number
	MailCtg: number
	PostMark: number
	IndexFrom: number
	TransType: number
	MailRank: number
	IndexTo: number
	characteristic: {
		bType: number
		attachType: number
		isReturnSender: number
		isPayment: number
		isValue: number
		isPodNumber: number
	}
}

export class QrcodeRequestDto {
	barcode: number | string
	index: number
	date: string
	typeBag: number
	attrBag: number
	typeTara: number
	model: number
	sizeMailType: number
	sizeMailCtg: number
	sizeMailRank: number
	sizeTransType: number
	sizeWeight: number
	sizePostMark: number
	sizeValue: number
	sizePayment: number
	itemsCount: number
	pagesCount: number
	pageItems: number
	pageNumber: number
	qrPosition: number
	items: Item[]
}
