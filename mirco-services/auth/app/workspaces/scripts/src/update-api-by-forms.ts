import { pipe } from 'fp-ts/lib/function'
import fs from 'fs'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import * as T from 'fp-ts/lib/Task'
import * as S from 'fp-ts/lib/string'
import * as A from 'fp-ts/lib/Array'
import _ from 'lodash'
import { join } from 'path'
import { FORMS } from '../../react/src/@generated/forms.enum'

const getFormDto = (formName: string) => `import {
	IsDefined,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsString,
	ValidateNested,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class ${formName.charAt(0).toUpperCase() + formName.slice(1)}Dto {}
`

const addGeneratedMeta = (str: string) => `
///<GENERATED

${str}

///GENERATED>
`

const getFormRoute = (formName: string) => `
@Post('/' + FORMS.${formName})
@ApiOperation({ summary: 'get PDF' })
@ApiResponse({ status: 200 })
async [FORMS.${formName}](
    @Body()variables: Form${formName.slice(4).toUpperCase()}Dto,
    @Res() response: express.Response,
) {
    response.setHeader('Content-Disposition', 'attachment; filename=${formName}.pdf')
    this.genpdfService
        .generateDocument({ type:'pdf', form:'${formName}', variables })
        .then((pdf) => {
            pdf.pipe(response)
        })
}
`

pipe(
	TE.of(
		pipe(
			Object.values(FORMS),
			A.filter((value) => typeof value === 'string'),
			A.filter((el) => el !== undefined),
		),
	),
	TE.bindTo('formList'),
	TE.bind('replacement', ({ formList }) =>
		TE.of(
			pipe(
				formList,
				A.map(getFormRoute),
				(arr) => arr.join('\n'),
				addGeneratedMeta,
			),
		),
	),
	TE.bind('regexp', () =>
		TE.of(/\/\/\/<GENERATED((.|[\r\n])*?)\/\/\/GENERATED>/g),
	),
	TE.bind('pathToController', () =>
		TE.of(
			join(process.cwd(), '..', 'api', 'src', 'genpdf', 'genpdf.controller.ts'),
		),
	),
	TE.bind('pathToDtos', () =>
		TE.of(join(process.cwd(), '..', 'api', 'src', 'genpdf', 'dto')),
	),
	TE.bind('dtoFormNamesToCreate', ({ pathToDtos, formList }) =>
		TE.of(
			pipe(
				fs.readdirSync(pathToDtos, { encoding: 'utf8' }),
				A.map((dto) => dto.split('.')[0]),
				(formListFromDtos) => _.xor(formListFromDtos, formList),
			),
		),
	),
	TE.bind('updateController', ({ replacement, pathToController, regexp }) =>
		TE.of(() =>
			fs.readFile(pathToController, 'utf8', (err, data) => {
				// console.log(err)

				fs.writeFile(
					pathToController,
					data.replace(regexp, replacement),
					'utf8',
					(err) => {
						// console.log(err)
					},
				)
			}),
		),
	),
	TE.bind('createFormDto', ({ dtoFormNamesToCreate, pathToDtos }) =>
		TE.of(() =>
			pipe(
				dtoFormNamesToCreate,
				// console.log,
				A.map((formName) => {
					console.log(formName)
					fs.writeFile(
						pathToDtos + '/' + formName + '.dto.ts',
						getFormDto(formName),
						'utf8',
						(err) => {
							console.log(err)
						},
					)
				}),
			),
		),
	),
	TE.map(({ updateController, createFormDto }) => {
		updateController()
		// createFormDto() //TODO доделать исключения для существующих форм
	}),
	// TE.map(({ replacement, pathToController, regexp }) => {
	// 	fs.readFile(pathToController, 'utf8', (err, data) => {
	// 		// console.log(err)

	// 		fs.writeFile(
	// 			pathToController,
	// 			data.replace(regexp, replacement),
	// 			'utf8',
	// 			(err) => {
	// 				// console.log(err)
	// 			},
	// 		)
	// 	})
	// }),
)()
