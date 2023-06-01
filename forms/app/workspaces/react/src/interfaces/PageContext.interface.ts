import { PackagesOnPages } from './PackagesOnPages.interface'
import { FORMS } from '../@generated/forms.enum'

export interface PageContext<Form extends keyof typeof FORMS> {
	pagesAmount: number
	packagesOnPages: PackagesOnPages[Form]
}
