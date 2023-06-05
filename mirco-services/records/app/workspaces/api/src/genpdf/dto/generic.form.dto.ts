import { FORMS } from '../../../../react/src/@generated/forms.enum'
import { getBarcodes } from '../../utils/getBarcodes'

export class GenericFormDto {
	// barcodes: Awaited<ReturnType<typeof getBarcodes>>
	form: keyof typeof FORMS | 'barcodes-layout'
	packagesLength: number
	datamatrixList: string
}
