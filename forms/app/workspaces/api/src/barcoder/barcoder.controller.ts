import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common'
import { BarcoderService } from './barcoder.service'

import { GenpdfService } from '../genpdf/genpdf.service'
import { BarcodesLayoutProps } from '../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'
import { BarcodesLayoutDto } from './dto/barcodesLayout.dto'
import { pathToStatic } from '../utils/pathToStatic'
import { flow, pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import path from 'path'
import { readFileAsync } from '../utils/readFileAsync'
import { BarcodeRangeDto } from './dto/barcode.api.dto'
import { BarCodeWriter } from '../utils/bwipjs'
import { barcodeImageBase64Dto } from './dto/barcodeImageBase64.dto'

@Controller('barcoder')
export class BarcoderController {
	constructor(
		private readonly barcoderService: BarcoderService,
		private readonly genpdfService: GenpdfService,
	) {}

	@Post('/getrange')
	async requestBarcode(@Body() body: BarcodeRangeDto) {
		const { amount, index } = body
		const r = await fetch('http://10.212.1.4:1314/barcode_test', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				index,
				number: amount,
			}),
		})
		return await r.json()
		// return this.barcoderService.create(createBarcoderDto)
	}

	@Post('/barcode_image_base64')
	barcodeBase64(@Body() body: { index: string[] }) {
		return Promise.all(
			body.index.map(async (barcodeNumber) => ({
				barcodeNumber,
				barcodeImageBase64: await pipe(
					barcodeNumber,
					BarCodeWriter.renderBarCode,
					BarCodeWriter.getImgBase64,
				),
			})),
		)
	}

	@Post('/barcodes-layout')
	barcodesLayout(@Body() barcodesLayoutProps: BarcodesLayoutDto) {
		console.log({ barcodesLayoutProps })

		return this.barcoderService.barcodesLayout(
			barcodesLayoutProps,
			this.genpdfService.generateDocument,
		)
	}

	@Get('/app')
	async barcodeApp() {
		const kk = await pipe(
			'',
			pathToStatic('barcodeApp'),
			path.resolve,
			readFileAsync,
		)
		// console.log({ kk })
		return kk
	}

	@Post('/test')
	async test(@Body() bbb: any) {
		console.log({ bbb })
		return 'testttttt'
	}

	// @Get()
	// findAll() {
	// 	return this.barcoderService.findAll()
	// }

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.barcoderService.findOne(+id)
	// }

	// @Patch(':id')
	// update(
	// 	@Param('id') id: string,
	// 	@Body() updateBarcoderDto: UpdateBarcoderDto,
	// ) {
	// 	return this.barcoderService.update(+id, updateBarcoderDto)
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.barcoderService.remove(+id)
	// }
}
