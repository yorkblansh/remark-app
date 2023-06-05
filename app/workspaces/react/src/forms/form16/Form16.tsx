import React from 'react'
import { Form16Interface } from '../../@generated/interfaces/form16.interface'
import { usePage } from '../../hooks/usePage'
import { form16Page } from './form16Page'

export const Form16 = (props: Form16Interface) => {
	const { Page, areMiddlePages, isLastPage } = usePage(props, form16Page)

	return (
		<>
			<Page type="first" />
			{areMiddlePages && <Page type="middlePages" />}
			{isLastPage && <Page type="last" />}
		</>
	)
}
