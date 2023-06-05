import { pipe } from 'fp-ts/lib/function'
import { join } from 'path'

type Predicat = 'byForm' | 'byBarcodeLayout' | 'barcodeApp'

export const pathToStatic = (predicat: Predicat) => (form: string) =>
	pipe(
		{
			byForm: join(
				process.cwd(),
				'..',
				'react',
				'dist',
				'src',
				'@generated',
				'templates',
				form,
				'index.html',
			),
			byBarcodeLayout: join(
				process.cwd(),
				'..',
				'react',
				'dist',
				'src',
				'barcodes-layout',
				'template',
				'index.html',
			),
			barcodeApp: join(
				process.cwd(),
				'..',
				'react',
				'dist',
				'src',
				'barcode-app',
				'template',
				'index.html',
			),
		},
		(obj) => obj[predicat],
	)
