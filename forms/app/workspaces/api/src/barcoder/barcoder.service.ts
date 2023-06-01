import { Injectable } from '@nestjs/common'
import { BarcodesLayoutProps } from '../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'
import { GenpdfService } from 'src/genpdf/genpdf.service'
import { pipe } from 'fp-ts/lib/function'
import { BarCodeWriter } from '../utils/bwipjs'
import { BarcodesLayoutDto } from './dto/barcodesLayout.dto'
import { BarcodesLayout } from '../../../react/src/barcodes-layout/BarcodesLayout'
import ReactDOMServer from 'react-dom/server'

@Injectable()
export class BarcoderService {
	async barcodesLayout(
		barcodesLayoutProps: BarcodesLayoutDto,
		generateDocument: GenpdfService['generateDocument'],
	) {
		const { index, barcodesOnPage, pageAmount } = barcodesLayoutProps

		const barcodeBase64 = await pipe(
			index,
			BarCodeWriter.renderBarCode,
			BarCodeWriter.getImgBase64,
		)

		console.log({ barcodeBase64 })

		// let kk = 'blankkkkk'

		// try {
		// 	kk = await generateDocument({
		// 		documentType: 'barcodes-layout',
		// 		returnFormat: 'html',
		// 		variables: {
		// 			barcodeBase64,
		// 			barcodesOnPage,
		// 			pageAmount,
		// 		},
		// 	})
		// } catch (error) {
		// 	console.log({ error })
		// }
		// return kk
		// console.log({ kk })
		return ReactDOMServer.renderToString(
			BarcodesLayout({
				barcodeBase64,
				barcodesOnPage,
				pageAmount,
			}),
		)
	}
	// create(createBarcoderDto: CreateBarcoderDto) {
	//   return 'This action adds a new barcoder';
	// }

	// findAll() {
	//   return `This action returns all barcoder`;
	// }

	// findOne(id: number) {
	//   return `This action returns a #${id} barcoder`;
	// }

	// update(id: number, updateBarcoderDto: UpdateBarcoderDto) {
	//   return `This action updates a #${id} barcoder`;
	// }

	// remove(id: number) {
	//   return `This action removes a #${id} barcoder`;
	// }
}
