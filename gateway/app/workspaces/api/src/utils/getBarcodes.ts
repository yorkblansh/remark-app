import { pipe } from 'fp-ts/lib/function'
import { Form16Dto } from 'src/genpdf/dto/form16.dto'
import { Form23ADto } from 'src/genpdf/dto/form23a.dto'
import { BarCodeWriter } from './bwipjs'
import * as TO from 'fp-ts/lib/TaskOption'

export const getBarcodes = async <T extends Form16Dto | Form23ADto>(
	variables: T,
) => ({
	dataMatrix: await pipe(
		variables,
		({ dataMatrixBase64 }) => dataMatrixBase64,
		BarCodeWriter.renderDataMatrix,
		BarCodeWriter.getImgBase64,
		// async (promise) => ({
		// 	imgSize: (await promise).size as 'small' | 'big',
		// 	imgBase64: await BarCodeWriter.getImgBase64((await promise).buffer),
		// }),
	),

	barcodeBase64: await pipe(
		variables,
		({ barcodeBase64 }) => barcodeBase64,
		BarCodeWriter.renderBarCode,
		BarCodeWriter.getImgBase64,
	),
})

export const getBarcodesTaskEither = (
	variables: Parameters<typeof getBarcodes>['0'],
) => TO.fromTask(async () => await getBarcodes(variables))
