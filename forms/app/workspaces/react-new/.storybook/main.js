/** @type {import("@storybook/builder-vite").StorybookViteConfig} */
const config = {
	stories: [
		"../src/**/*.stories.mdx",
		"../src/**/*.stories.@(js|jsx|ts|tsx)",
		"../src/components/**/*.stories.@(js|jsx|ts|tsx)",
	],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-interactions",
	],
	framework: "@storybook/react",
	core: {
		builder: "@storybook/builder-vite",
	},
	features: {
		storyStoreV7: true,
	},
	// staticDirs: [{ from: '../fonts', to: 'fonts' }],
	async viteFinal(config, options) {
		// Add your configuration here
		// return config
		return (await import("vite")).mergeConfig(config, {
			// Use the same "resolve" configuration as your app
			// resolve: await import("../vite.config"),
			// Add dependencies to pre-optimization
			optimizeDeps: {
				include: ["storybook-dark-mode"],
			},
		})
	},
	typescript: {
		check: true,
		reactDocgen: "react-docgen-typescript",
	},
}

module.exports = config
