import { join } from 'path'
import { FORMS } from '../../react/src/@generated/forms.enum'
import fs from 'fs'

const formNameToCreate = process.env.FORM_NAME

const alreadyCreatedformNames = Object.values(FORMS)
	.filter((value) => typeof value === 'string')
	// .map((v, i, arr) => (i <= arr.length / 2 ? v : undefined))
	.filter((el) => el !== undefined) as string[]

const formTsx = (formName: string) => `import React from 'react'

export const form${formName} = ({}) => {
	return <div></div>
}
`

const indexScss = () => `// @import "./App.scss"; <-- example

:root {
	font-family: 'TimesNewRomanRegular', Times, serif, Inter, Avenir, Helvetica,
		Arial, sans-serif;
	font-size: 10px;
	line-height: 10px;
	font-weight: 400;

	color-scheme: light dark;
	color: rgba(0, 0, 0, 0.87);
	background-color: white;

	font-synthesis: none;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	-webkit-text-size-adjust: 100%;
}

a {
	font-weight: 500;
	color: #646cff;
	text-decoration: inherit;
}
a:hover {
	color: #535bf2;
}

body {
	margin: 0;
	display: flex;
	flex-direction: column;
	// place-items: center;
	// min-width: 320px;
	// min-height: 100vh;
}

h1 {
	font-size: 3.2em;
	line-height: 1.1;
}

#app {
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	text-align: center;
}

.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vanilla:hover {
	filter: drop-shadow(0 0 2em #3178c6aa);
}

.card {
	padding: 2em;
}

.read-the-docs {
	color: #888;
}

button {
	border-radius: 8px;
	border: 1px solid transparent;
	padding: 0.6em 1.2em;
	font-size: 1em;
	font-weight: 500;
	font-family: inherit;
	background-color: #1a1a1a;
	cursor: pointer;
	transition: border-color 0.25s;
}
button:hover {
	border-color: #646cff;
}
button:focus,
button:focus-visible {
	outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
	:root {
		color: black;
		background-color: #ffffff;
	}
	a:hover {
		color: #747bff;
	}
	button {
		background-color: #f9f9f9;
	}
}
`

const formProps = (formName: string) => `export const form${formName}Props = {}
`

if (formNameToCreate) {
	if (!alreadyCreatedformNames.includes(formNameToCreate)) {
		const formPath = join(
			process.cwd(),
			'..',
			'react',
			'src',
			'forms',
			formNameToCreate,
		)

		try {
			fs.mkdirSync(formPath)
		} catch (error: any) {
			console.log(error)
			// console.log(formPath + ' | ' + error.code + ' | ' + 'папкт не существует')
		}

		try {
			fs.writeFileSync(
				formPath + '/form' + formNameToCreate.slice(4) + '.tsx',
				formTsx(formNameToCreate.slice(4)),
			)
		} catch (error) {
			console.log(error)
		}

		try {
			fs.writeFileSync(
				formPath + '/form' + formNameToCreate.slice(4) + 'Props' + '.ts',
				formProps(formNameToCreate.slice(4)),
			)
		} catch (error) {
			console.log(error)
		}

		try {
			fs.writeFileSync(formPath + '/index.scss', indexScss())
		} catch (error) {
			console.log(error)
		}
	} else {
		console.log('form already exists!!')
	}
} else {
	console.log('incorrect form name or form name is undefined')
}
