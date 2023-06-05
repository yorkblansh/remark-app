import React from 'react'
import ReactDOM from 'react-dom/client'
import { Form23a } from '../../../../src/forms/form23a/Form23a'
import { form23aProps } from '../../../../src/forms/form23a/form23aProps'
import '../../../../src/forms/form23a/index.scss'

const env = process.env.NODE_ENV as 'development' | 'production'

if (env === 'development') {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		Form23a(form23aProps)
	)
}
