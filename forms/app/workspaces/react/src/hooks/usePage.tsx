import React from 'react'
import { usePackagesByPages } from './usePackagesByPages'
import { FORMS } from '../@generated/forms.enum'
import { FormPage, FormProps, PageType } from '../interfaces/FormPage.interface'
import { pipe } from 'fp-ts/lib/function'

export const usePage = <
	Form extends keyof typeof FORMS,
	Packages extends unknown[]
>(
	formProps: FormProps,
	page: FormPage<typeof formProps.form>,
	formName?: Form
) => {
	const form = formName ? formName : formProps.form
	const packages = formProps.packages

	const rangesMap: {
		[each in typeof form]: Pick<
			Parameters<typeof usePackagesByPages<Packages>>['0'],
			'firstPageRange' | 'middlePagesRange'
		>
	} = {
		form16: {
			firstPageRange: 54,
			middlePagesRange: 72,
		},
		form23a: {
			firstPageRange: 54,
			middlePagesRange: 72,
		},
		'barcodes-layout': { firstPageRange: 0, middlePagesRange: 0 },
	}

	const formPackagesRanges = rangesMap[form]

	const dividedPackages = usePackagesByPages({ ...rangesMap[form], packages })

	console.log({
		middlePagePackagesList: dividedPackages.middlePagePackagesList,
	})

	return {
		Page: ({ type }: { type: PageType }) =>
			({
				middlePages: pipe(
					dividedPackages.middlePagePackagesList?.map((middlePagePackages, i) =>
						page({
							formPackagesRanges,
							currentPagePackages: middlePagePackages,
							type: 'middlePages',
							formProps,
							pageNumber: i + 2,
						})
					),
					(jsxList) =>
						jsxList.length === 0
							? null
							: jsxList.reduce((prevJsx, currJsx) => (
									<>
										{prevJsx ? prevJsx : <></>}
										{currJsx}
									</>
							  ))
				),
				first: page({
					formPackagesRanges,
					currentPagePackages: dividedPackages.firstPagePackages,
					type: 'first',
					formProps,
					pageNumber: 1,
				}),
				last: page({
					formPackagesRanges,
					currentPagePackages: dividedPackages.lastPagePackages,
					type: 'last',
					formProps,
					pageNumber: dividedPackages.middlePagePackagesList.length + 2,
				}),
			}[type]),

		areMiddlePages: dividedPackages.middlePagePackagesList.length !== 0,
		isLastPage: dividedPackages.lastPagePackages.length !== 0,

		dividedPackages,
		rangesMap,
	}
}
