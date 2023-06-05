import { pipe } from 'fp-ts/lib/function'
import { join } from 'path'
import { Project, SourceFile } from 'ts-morph'
import { renameTo } from './utils'
// import { Form16Dto } from '../../api/src/genpdf/dto/form16.dto'

// input files
const form23aDtoFileName = 'form23a.dto.ts'
const form16DtoFileName = 'form16.dto.ts'
const genericFormDtoFileName = 'generic.form.dto.ts'

// читаем tsconfig из проекта в котором находится исходный dto
const project = new Project({
	tsConfigFilePath: join(process.cwd(), '..', 'api', 'tsconfig.json'),
})

let form23aInterfaceFile: SourceFile
let form16InterfaceFile: SourceFile
let genericFormInterfaceFile: SourceFile

try {
	form23aInterfaceFile = project.createSourceFile(
		join(
			process.cwd(),
			'..',
			'react',
			'src',
			'@generated',
			'interfaces',
			pipe(form23aDtoFileName, renameTo('interface')),
		),
	) // создаем конечный файл с измененным именем в который будем записывать
} catch (error) {
	console.log({ 'ts-morph_error': error })
}

try {
	genericFormInterfaceFile = project.createSourceFile(
		join(
			process.cwd(),
			'..',
			'react',
			'src',
			'@generated',
			'interfaces',
			pipe(genericFormDtoFileName, renameTo('interface')),
		),
	) // создаем конечный файл с измененным именем в который будем записывать
} catch (error) {
	console.log({ 'ts-morph_error': error })
}

try {
	form16InterfaceFile = project.createSourceFile(
		join(
			process.cwd(),
			'..',
			'react',
			'src',
			'@generated',
			'interfaces',
			pipe(form16DtoFileName, renameTo('interface')),
		),
	) // создаем конечный файл в который будем записывать
} catch (error) {
	console.log({ 'ts-morph_error': error })
}

project.getSourceFiles().forEach((sourceFile) => {
	// ищем dto формы из бэкэнда
	if (sourceFile.getBaseName() === form23aDtoFileName) {
		/**
		 * form23a
		 */
		const form23aInterface = sourceFile
			.getClass('Form23ADto')
			.extractInterface('Form23AInterface')
		form23aInterfaceFile.addInterface(form23aInterface).setIsExported(true)

		const numberOfContainers = sourceFile
			.getClass('NumberOfContainers')
			.extractInterface()
		form23aInterfaceFile.addInterface(numberOfContainers)
	}

	if (sourceFile.getBaseName() === form16DtoFileName) {
		/**
		 * form16
		 */
		const form16Interface = sourceFile
			.getClass('Form16Dto')
			.extractInterface('Form16Interface')
		form16InterfaceFile
			.addInterface(form16Interface)
			.setIsExported(true)
			.addExtends('GenericFormInterface')

		const Packages = sourceFile.getClass('Packages').extractInterface()

		form16InterfaceFile.addInterface(Packages)
		form16InterfaceFile.addImportDeclaration({
			namedImports: [{ name: 'GenericFormInterface' }],
			moduleSpecifier: './generic.interface',
		})
	}

	if (sourceFile.getBaseName() === genericFormDtoFileName) {
		/**
		 * generic form
		 */
		const genericFormInterface = sourceFile
			.getClass('GenericFormDto')
			.extractInterface('GenericFormInterface')

		genericFormInterfaceFile
			.addInterfaces([genericFormInterface])
			.map((eachInterface) => eachInterface.setIsExported(true))
	}
})

// сохраняем все изменения
project.saveSync()
