class Item {
	RpiBarcode: number | string
	Weight: number
	MailType: number
	MailCtg: number
	MailRank: number
	PostMark: number
	TransType: number
	IndexFrom: number
	IndexTo: number
	characteristic: {
		bType: number
		attachType: number
		isReturnSender: number
		isPayment: number
		isValue: number
		isPodNumber: number
	}
	RpiValue: number
}

class RpisGroups {
	mail_type: number
	cnt: number
}

export class Form16Data {
	barcode: string
	date_p: string
	date: string
	index: number
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
	rpis_groups: RpisGroups[]
	items: Item[]
}
