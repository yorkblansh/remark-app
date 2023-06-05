import { defineConfig } from 'vite'
import { resolve, join } from 'path'
import { VitePluginNode } from 'vite-plugin-node'
import react from '@vitejs/plugin-react'

const LIB_NAME = process.env.LIB_NAME

const config = {
	'symlink-shared': {
		entry: resolve(join(process.cwd()), './src/symlink-shared.ts'),
		fileName: 'symlink-shared.js',
	},
	'symlink-forms': {
		entry: resolve(join(process.cwd()), './src/symlink-forms.ts'),
		fileName: 'symlink-forms.js',
	},
	'generate-form-interfaces': {
		entry: resolve(join(process.cwd()), './src/generate-form-interfaces.ts'),
		fileName: 'generate-form-interfaces.js',
	},
	'generate-form-enum': {
		entry: resolve(join(process.cwd()), './src/generate-form-enum.ts'),
		fileName: 'generate-form-enum.js',
	},
	'remove-temp-folders': {
		entry: resolve(join(process.cwd()), './src/remove-temp-folders.ts'),
		fileName: 'remove-temp-folders.js',
	},
	'generate-static-temlates': {
		entry: resolve(join(process.cwd()), './src/generate-static-temlates.ts'),
		fileName: 'generate-static-temlates.js',
	},
	'create-form-template': {
		entry: resolve(join(process.cwd()), './src/create-form-template.ts'),
		fileName: 'create-form-template.js',
	},
}

const currentConfig = config[LIB_NAME]

console.log({ LIB_NAME })
if (currentConfig === undefined) {
	throw new Error('LIB_NAME is not defined or is not valid')
}

export default defineConfig({
	build: {
		outDir: `./dist/${LIB_NAME}`,
		lib: {
			...currentConfig,
			formats: ['cjs', 'es'],
		},
		emptyOutDir: false,
	},
	// ...vite configures
	server: {
		// vite server configs, for details see \[vite doc\](https://vitejs.dev/config/#server-host)
		port: 3000,
	},
	plugins: [
		// react(),
		...VitePluginNode({
			// Nodejs native Request adapter
			// currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
			// you can also pass a function if you are using other frameworks, see Custom Adapter section
			// adapter: "",
			// tell the plugin where is your project entry
			appPath: `./src/${LIB_NAME}.ts`,
			// swcOptions: { outputPath: "/dist/generate-form-interfaces/index" },
			// Optional, default: 'viteNodeApp'
			// the name of named export of you app from the appPath file
			exportName: 'viteNodeApp',
			// Optional, default: 'esbuild'
			// The TypeScript compiler you want to use
			// by default this plugin is using vite default ts compiler which is esbuild
			// 'swc' compiler is supported to use as well for frameworks
			// like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
			// you need to INSTALL `@swc/core` as dev dependency if you want to use swc
			tsCompiler: 'swc',
		}),
	],
	optimizeDeps: {
		// Vite does not work well with optionnal dependencies,
		// mark them as ignored for now
		exclude: [
			'@nestjs/microservices',
			'@nestjs/websockets',
			'cache-manager',
			'class-transformer',
			'class-validator',
			'fastify-swagger',
			'@apollo/subgraph',
		],
	},
})
