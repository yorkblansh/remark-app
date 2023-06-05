import { pipe } from 'fp-ts/lib/function'
import fs from 'fs'
import { join } from 'path'
import { FORMS } from '../../react/src/@generated/forms.enum'
import * as A from 'fp-ts/lib/Array'
import { firstLetterToUpperCase } from './utils/firstLetterToUpperCase'

const mainTsx = (formName: string) =>
	`import React from 'react'
import ReactDOM from 'react-dom/client'
import { ${firstLetterToUpperCase(
		formName,
	)} } from '../../../../src/forms/${formName}/${firstLetterToUpperCase(
		formName,
	)}'
import { ${formName}Props } from '../../../../src/forms/${formName}/${formName}Props'
import '../../../../src/forms/${formName}/index.scss'

const env = process.env.NODE_ENV as 'development' | 'production'

if (env === 'development') {
	ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		${firstLetterToUpperCase(formName)}(${formName}Props)
	)
}
`

const indexHtml = (formName: string) =>
	`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="/vite.svg" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>ФОРМА: ${formName.slice(4)}</title>
	</head>
	<body>
		<div id="root"></div>
		<script type="module" src="main.tsx"></script>
	</body>
</html>
`

Object.values(FORMS)
	.filter((value) => typeof value === 'string')
	// .map((v, i, arr) => (i <= arr.length / 2 ? v : undefined))
	.filter((el) => el !== undefined)
	.map((formName) => ({
		formName,
		formPath: join(
			process.cwd(),
			'..',
			'react',
			'src',
			'@generated',
			'templates',
			formName,
		),
	}))
	.map(({ formPath, formName }) => {
		try {
			fs.rmdirSync(formPath, { recursive: true })
		} catch (error: any) {
			console.log(formPath + ' | ' + error.code + ' | ' + 'папкт не существует')
		}

		return { formPath, formName }
	})
	.map(({ formName, formPath }) => {
		console.table([{ formName, formPath }])
		try {
			fs.mkdirSync(formPath, { recursive: true })
			fs.writeFileSync(formPath + '/index.html', indexHtml(formName))
		} catch (error) {
			console.log(error)
		}

		try {
			fs.mkdirSync(formPath, { recursive: true })
			fs.writeFileSync(formPath + '/main.tsx', mainTsx(formName))
		} catch (error) {
			console.log(error)
		}
	})
