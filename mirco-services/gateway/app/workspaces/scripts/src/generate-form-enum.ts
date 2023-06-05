import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import * as S from 'fp-ts/lib/string'
import { join } from 'path'
import fs from 'fs'
import { Project, SourceFile } from 'ts-morph'
import getLastArrIndex from 'lodash/last'
// import { yy } from 'yush/dist/events'

const formsProject = new Project({
	tsConfigFilePath: join(process.cwd(), '..', 'react', 'tsconfig.json'),
})

const formsEnumPath = join(
	process.cwd(),
	'..',
	'react',
	'src',
	'@generated',
	'forms.enum.ts',
)

try {
	fs.rmSync(formsEnumPath, { recursive: true, force: true })
} catch (error: any) {
	console.log(error)
	// console.log(formPath + ' | ' + error.code + ' | ' + 'папкт не существует')
}

const formsFile = formsProject.createSourceFile(formsEnumPath)

const formClass = formsFile
	.addEnum({
		name: 'FORMS',
	})
	.setIsExported(true)

const getformNameFromPath = (path: string) =>
	pipe(path.split('.')[0], (str) => str.split('/'), getLastArrIndex)

const getPathes = (regexpArr: RegExp[], pathToWorkspace: string) =>
	pipe(
		formsProject.getSourceFiles() as SourceFile[],
		A.map((sf) => sf.getFilePath().split(pathToWorkspace)[1]),
		A.filter((a) => a !== undefined),
		A.map((path) =>
			pipe(
				regexpArr,
				A.map((regexp) => path.match(regexp) as RegExpMatchArray),
				A.filter((a) => a !== null),
			),
		),
		A.filter((a) => a !== undefined),
		A.flatten,
		A.flatten,
	)

pipe(
	getPathes([/src\/forms\/form\d?.+\/Form\d.+\.tsx/gm], 'workspaces/react/'),
	A.map(getformNameFromPath),
	A.filter((el) => el !== undefined),
	// A.concat(['barcodes-layout']),
	A.map(S.toLowerCase),
	A.map((formName) => formClass.addMember({ name: formName, value: formName })),
)

formsFile.saveSync()
