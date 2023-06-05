import { Injectable } from '@nestjs/common'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { pipe } from 'fp-ts/lib/function'
import * as T from 'fp-ts/lib/Task'
import * as TO from 'fp-ts/lib/TaskOption'
import { IgenerateDocument } from './typings/genpdf.service.typings'
import { Form16 as form16 } from '../../../react/src/forms/form16/Form16'
import { Form23a as form23a } from '../../../react/src/forms/form23a/Form23a'
import { FORMS } from '../../../react/src/@generated/forms.enum'
import { HttpService } from '@nestjs/axios'
import { Form16Dto } from './dto/form16.dto'
import { pathToStatic } from '../utils/pathToStatic'
import { readFileAsync } from '../utils/readFileAsync'
import { fetchPDFStream } from '../utils/fetchPDFStream'
import { GenericFormDto } from './dto/generic.form.dto'
import { BarcodesLayout } from '../../../react/src/barcodes-layout/BarcodesLayout'
import axios from 'axios'

const options = {
	format: 'A4',
	headerTemplate: '<p></p>',
	footerTemplate: '<p></p>',
	displayHeaderFooter: false,
	margin: {
		// top: '40px',
		// bottom: '100px',
		left: '80px',
		right: '40px',
	},
	printBackground: true,
	// path: join(process.cwd(), "index.pdf"),
}

const formsMap: {
	[EachName in keyof typeof FORMS & 'barcodes-layout']: (
		variables: any,
	) => JSX.Element
} = {
	form16,
	form23a,
	'barcodes-layout': BarcodesLayout,
}

@Injectable()
export class GenpdfService {
	constructor(private readonly httpService: HttpService) {}

	generateDocument: IgenerateDocument = async ({
		returnFormat,
		documentType,
		variables,
	}) => {
		const datamatrixList = ''

		const html = await this.getHydratedHtml({
			documentType,
			variables,
			datamatrixList,
		})

		// console.log({ html })

		return {
			pdf: await fetchPDFStream({ html, options }),
			html,
		}[returnFormat]
	}

	private getHydratedHtml = ({
		documentType,
		variables,
		datamatrixList,
	}: Pick<
		Parameters<typeof this.generateDocument>['0'],
		'documentType' | 'variables'
	> & { datamatrixList: string }) =>
		pipe(
			TO.fromTask(
				async () =>
					await pipe(
						documentType,
						pathToStatic(
							documentType === 'barcodes-layout' ? 'byBarcodeLayout' : 'byForm',
						),
						(path) => {
							console.log({ path })
							return path
						},
						path.resolve,
						readFileAsync,
					),
			),
			TO.bindTo('htmlStatic'),
			TO.bind('variables', () => TO.of(variables as Form16Dto)),
			//INFO genric data | generic form | variables
			TO.bind('genericData', ({ variables }) => {
				return TO.of<GenericFormDto>({
					form: documentType,
					packagesLength: variables.packages
						? variables.packages.length
						: undefined,
					datamatrixList,
				})
			}),
			TO.bind('JSXform', ({ genericData, variables }) =>
				TO.of(pipe({ ...variables, ...genericData }, formsMap[documentType])),
			),
			TO.bind('reactString', ({ JSXform }) =>
				TO.of(pipe(JSXform, ReactDOMServer.renderToString)),
			),
			TO.map(({ htmlStatic, reactString }) =>
				htmlStatic.replace(
					'<div id="root"></div>',
					`<div id="root">${reactString}</div>`,
				),
			),
			TO.getOrElse(() => T.of('err')),
		)()
}
