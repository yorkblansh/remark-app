import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'
import { pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'

const FORM_NAME = process.env.FORM_NAME
const BARCODE_TEMPLATE = process.env.BARCODE_TEMPLATE as
	| 'layout-prod'
	| 'layout-dev'
	| 'app-dev'
	| 'app-prod'
	| undefined

console.log({ BARCODE_TEMPLATE })

type TemplateKeysUnion = typeof FORM_NAME | typeof BARCODE_TEMPLATE
const temlatesList = [FORM_NAME, BARCODE_TEMPLATE]

const formTemplatesMap: { [each in typeof FORM_NAME]: string } = {
	form16: `src/@generated/templates/${FORM_NAME}/index.html`,
	form23a: `src/@generated/templates/${FORM_NAME}/index.html`,
}

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 5172,
		cors: true,
		// hmr: { protocol: 'ws', host: 'localhost' },
		watch: { usePolling: true, alwaysStat: true, persistent: true },
	},
	resolve: { preserveSymlinks: true },
	plugins: [
		react({
			include: '**/*.tsx',
		}),
		viteSingleFile({
			useRecommendedBuildConfig: false,
			removeViteModuleLoader: true,
			// inlinePattern: ["glob"],
		}),
	],
	define: {
		'process.env': process.env,
	},
	build: {
		emptyOutDir: false,
		rollupOptions: {
			output: { compact: true },
			input: {
				main: resolve(
					__dirname,
					pipe(
						pipe({
							'layout-dev': 'src/barcodes-layout/template/index.html',
							'app-prod': 'src/barcode-app/template/index.html',
							'app-dev': 'src/barcode-app/template/index.html',
							'layout-prod': 'src/barcodes-layout/template/index.html',
							...formTemplatesMap,
						} as {
							[each in TemplateKeysUnion]: string
						})[BARCODE_TEMPLATE ? BARCODE_TEMPLATE : FORM_NAME],
						(p) => {
							console.log({ p })
							return p
						}
					)
				),
				// form23: resolve(__dirname, "form23/index.html"),
				// nested: resolve(__dirname, "nested/index.html"),
			},
		},
	},
})
