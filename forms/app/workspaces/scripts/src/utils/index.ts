export type FileType = "interface" | "dto"

export const renameTo =
	(fileType: FileType) => (sourceFileName: string) => {
		const prefix = sourceFileName.split(".")[0]
		return prefix + "." + fileType + "." + "ts"
	}
