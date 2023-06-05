export interface DatamatrixRequestForm16 {
	RpiBarcode: number
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
