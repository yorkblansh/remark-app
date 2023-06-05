// import { FORMS } from '../../shared/@generated/forms.enum'
import { FORMS } from '../../../../react/src/@generated/forms.enum'
import internal from 'stream'
import { Form16Dto } from '../dto/form16.dto'
import { Form23ADto } from '../dto/form23a.dto'
import { BarcodesLayoutProps } from '../../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'

interface GenerateDocumentParams<Form, Variables, ReturningDocumentTypes> {
	/**
	 * Returning document type
	 */
	returnFormat: ReturningDocumentTypes

	/**
	 * form type
	 *
	 * example: form16 or form23a etc.
	 */
	documentType: Form

	/**
	 * form variables
	 */
	variables: Variables
}

export type IgenerateDocument = <
	ReturningDocumentTypes extends 'pdf' | 'html',
	Form extends keyof typeof FORMS | 'barcodes-layout',
	Variables = Form extends 'form16'
		? Form16Dto
		: Form extends 'form16'
		? Form23ADto
		: BarcodesLayoutProps,
>(
	params: GenerateDocumentParams<Form, Variables, ReturningDocumentTypes>,
) => Promise<{ pdf: internal.Readable; html: string }[ReturningDocumentTypes]>
