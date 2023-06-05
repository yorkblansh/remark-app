import { Body, Controller, Get, Post, Redirect } from '@nestjs/common'
import { AppService } from './app.service'
import axios from 'axios'
import { pipe } from 'fp-ts/lib/function'
import { Form16Data } from './dto/form16.data.dto'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { DatamatrixRequestDto } from './dto/datamatrix.request.dto'
import { DepartmentDto } from './dto/department.dto'
import { pathToStatic } from './utils/pathToStatic'
import path from 'path'
import { readFileAsync } from './utils/readFileAsync'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	// @Redirect('http://localhost/api', 301)
	getHello() {
		return 'sss'
	}

	@Get('/barcoder')
	async barcoder() {
		const kk = await pipe(
			'',
			pathToStatic('barcodeApp'),
			path.resolve,
			readFileAsync,
		)
		// console.log({ kk })
		return kk
	}

	@Post('/abbrev')
	async getAbbrev() {
		console.log('abbrev')

		return await fetch('http://10.212.1.4:1401/abbrev', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((a) => a.json().then((json) => json))
			.catch((e) => {
				console.log({ e })
			})
	}

	@Post('/department')
	@ApiOperation({ summary: 'get get department info' })
	@ApiResponse({ status: 200 })
	async getDepartmentInfo(@Body() body: DepartmentDto) {
		const { index } = body
		const r = await pipe(
			await fetch(
				`http://ops.pochta-lnr.ru/api/postoffices/${index}?api_token=YQDdtS6NqdzE164cTUbNfWjL507HH8iB0nVModvT6b1Qw6zY441hunkSP7uu`,
				{
					method: 'GET',
				},
			),
			async (r) => await r.text(),
		)

		return r
	}

	@Post('/datamatrixform16')
	@ApiOperation({ summary: 'get datamatrix string' })
	@ApiResponse({ status: 200 })
	async getDatamatrixOnForm16(@Body() body: DatamatrixRequestDto) {
		const form16Data: Form16Data[] = await pipe(
			await fetch('http://10.212.1.4:1401/f16', {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(body),
			}),
			async (r) => await r.json(),
		)
		// const {
		// 	attrBag,
		// 	barcode,
		// 	date,
		// 	index,
		// 	itemsCount,
		// 	model,
		// 	pageItems,
		// 	pageNumber,
		// 	sizeMailCtg,
		// 	sizeMailRank,
		// 	sizeMailType,
		// 	sizePayment,
		// 	sizePostMark,
		// 	sizeTransType,
		// 	sizeValue,
		// 	sizeWeight,
		// 	typeBag,
		// 	typeTara,
		// 	qrPosition,
		// 	pagesCount,
		// 	items,
		// } = form16Data[0]

		// const qrcodeRequest: QrcodeRequestDto = {
		// 	attrBag,
		// 	barcode,
		// 	date,
		// 	index,
		// 	items,
		// 	itemsCount,
		// 	model,
		// 	pageItems,
		// 	pageNumber,
		// 	pagesCount,
		// 	qrPosition,
		// 	sizeMailCtg,
		// 	sizeMailRank,
		// 	sizeMailType,
		// 	sizePayment,
		// 	sizePostMark,
		// 	sizeTransType,
		// 	sizeValue,
		// 	sizeWeight,
		// 	typeBag,
		// 	typeTara,
		// }

		const datamatrix = await pipe(
			await fetch('http://10.212.1.4:1401/qrcode', {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(form16Data[0]),
			}),
			async (r) => await r.text(),
		)

		return datamatrix
	}
}
