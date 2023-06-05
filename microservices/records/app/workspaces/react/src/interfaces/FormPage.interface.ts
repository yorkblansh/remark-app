import { FORMS } from '../@generated/forms.enum'
import { Form16Interface } from '../@generated/interfaces/form16.interface'

//  | Form23AInterface

export type PageType = 'first' | 'middlePages' | 'last'

export type FormProps = Form16Interface

interface PageProps<
	Form extends keyof typeof FORMS | 'barcodes-layout',
	PackageList extends unknown[] = Form extends 'form16'
		? Form16Interface['packages']
		: Form extends 'form23a'
		? Form16Interface['packages']
		: unknown[]
> {
	currentPagePackages: PackageList
	type: PageType
	formProps: Omit<FormProps, 'packages'>
	pageNumber: number
	formPackagesRanges: {
		firstPageRange: number
		middlePagesRange: number
	}
}

export type FormPage<Form extends keyof typeof FORMS | 'barcodes-layout'> = (
	props: PageProps<Form>
) => JSX.Element
