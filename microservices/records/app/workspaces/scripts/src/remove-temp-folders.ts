import { rm } from "fs/promises"
import { join } from "path"
import chalk from "chalk"
import { pipe } from "fp-ts/lib/function"

const error_color = chalk.bold.red
const warning_color = chalk.hex("#fbff00").bold
const blue_color = chalk.hex("#79aad8")
const green_color = chalk.hex("#4fff5d")

/**
 * функция удаляет директории
 * @param pathFromWebFolder переменная принимает путь, начиная с папки web
 */
const removeFolder = async (pathFromWebFolder: string) => {
	try {
		await rm(join(process.cwd(), "..", "..", pathFromWebFolder), {
			recursive: true,
		})
		pipe(
			`successfully deleted!                 | ${pathFromWebFolder}`,
			green_color,
			console.log
		)
	} catch (error:any) {
		error.code === "ENOENT"
			? pipe(
					`directory does not exist, avoiding... | ${pathFromWebFolder}`,
					blue_color,
					console.error
			  )
			: console.error({
					disclaimer: pipe(
						`there was an error with: ${pathFromWebFolder}`,
						error_color
					),
					error,
			  })
	}
}

;[
	/** dists */
	join("workspaces", "react", "dist"),
	join("workspaces", "pdf-api", "dist"),
	join("workspaces", "scripts", "dist"),

	/** forms */
	join("workspaces", "pdf-api", "ssr", "forms"),
	join("workspaces", "pdf-api", "ssr", "static"),

	/** node modules */
	// join("workspaces", "react", "node_modules"),
	// join("workspaces", "pdf-api", "node_modules"),
	// join("workspaces", "scripts", "node_modules"),
	// join("node_modules"),

	/** symlinks */
	join("workspaces", "react", "src", "shared"),
	join("workspaces", "pdf-api", "src", "shared"),

	/** @generated */
	join("workspaces", "shared", "@generated"),
].map(removeFolder)
