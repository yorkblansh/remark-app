import { Controller, Body, Res, Post } from '@nestjs/common'
import { GenpdfService } from './genpdf.service'
import { FORMS } from '../../../react/src/@generated/forms.enum'
import * as express from 'express'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Form23ADto } from './dto/form23a.dto'
import { Form16Dto } from './dto/form16.dto'

@ApiTags('genpdf')
@Controller('genpdf')
export class GenpdfController {
	constructor(private readonly genpdfService: GenpdfService) {}

	///<GENERATED

	@Post('/' + FORMS.form16)
	@ApiOperation({ summary: 'get PDF' })
	@ApiResponse({ status: 200 })
	async [FORMS.form16](
		@Body() variables: Form16Dto,
		@Res() response: express.Response,
	) {
		response.setHeader('Content-Disposition', 'attachment; filename=form16.pdf')
		this.genpdfService
			.generateDocument({
				returnFormat: 'pdf',
				documentType: 'form16',
				variables,
			})
			.then((pdf) => {
				pdf.pipe(response)
			})
	}

	@Post('/' + FORMS.form23a)
	@ApiOperation({ summary: 'get PDF' })
	@ApiResponse({ status: 200 })
	async [FORMS.form23a](
		@Body() variables: Form23ADto,
		@Res() response: express.Response,
	) {
		response.setHeader(
			'Content-Disposition',
			'attachment; filename=form23a.pdf',
		)
		this.genpdfService
			.generateDocument({
				returnFormat: 'pdf',
				documentType: 'form23a',
				variables,
			})
			.then((pdf) => {
				pdf.pipe(response)
			})
	}

	///GENERATED>
}

// // для отправки буфера
// pipe(
// 	await this.genpdfService.generateDocument(
// 		'html',
// 		'form16',
// 		formVariables,
// 	),
// 	response.send,
// )
