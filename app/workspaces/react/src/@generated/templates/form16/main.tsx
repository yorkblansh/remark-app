import React from 'react'
import ReactDOM from 'react-dom/client'
import { Form16 } from '../../../../src/forms/form16/Form16'
import { form16Props } from '../../../../src/forms/form16/form16Props'
import '../../../../src/forms/form16/index.scss'

const env = process.env.NODE_ENV as 'development' | 'production'

if (env === 'development') {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		Form16(form16Props)
	)
}
