import { join } from 'path'
import fs from 'fs'
import { FORMS } from '../../react/src/@generated/forms.enum'
import { firstLetterToUpperCase } from './utils/firstLetterToUpperCase'

const pathToJsxFormsMapTsx = join(
	process.cwd(),
	'..',
	'react',
	'src',
	'@generated',
	'JsxFormsMap.tsx',
)

const formsList = Object.values(FORMS)
// .filter((value) => typeof value === 'string')
// .filter((el) => el !== undefined)

const JsxFormsMapTsx = () => {
	const upprCase = (form: string) => firstLetterToUpperCase(form)

	const imports = () =>
		formsList
			.map((form) => {
				return (
					`import { ${upprCase(form)} } from '../forms/${form}/${upprCase(
						form,
					)}'` +
					'\n' +
					`import { ${form}Props } from '../forms/${form}/${form}Props'`
				)
			})
			.join('\n')

	const formMapObject = () =>
		'\n' +
		'export const JsxFormsMap = {' +
		'\n' +
		formsList
			.map(
				(form) => `${form}: () => {
                import('../forms/${form}/index.scss')
                return <${upprCase(form)} {...${form}Props} />
            },`,
			)
			.join('\n') +
		'}'

	console.log({ imports: imports(), formMapObject: formMapObject() })

	return imports() + formMapObject()
}

try {
	fs.writeFileSync(pathToJsxFormsMapTsx, JsxFormsMapTsx())
} catch (error) {
	console.log(error)
}
