import bwipjs from 'bwip-js'
import { flow, pipe } from 'fp-ts/lib/function'

export class BarCodeWriter {
	static async renderBarCode(value: string) {
		try {
			return bwipjs.toBuffer({
				bcid: 'code128', // Barcode type
				text: value, // Text to encode
				scale: 1, // 3x scaling factor
				// height: 10, // Bar height, in millimeters
				includetext: false, // Show human-readable text
				textxalign: 'center', // Always good to set this
			})
		} catch (error) {
			console.log({
				error,
				//  currentPath: process.cwd()
			})
		}
	}

	static async renderDataMatrix(value: string) {
		try {
			const buffer = await bwipjs.toBuffer({
				bcid: 'datamatrix', // Barcode type
				text: value, // Text to encode
				scale: 1, // 3x scaling factor
				// height: 10, // Bar height, in millimeters
				includetext: true, // Show human-readable text
				textxalign: 'center', // Always good to set this
			})

			const isSmall = value.length <= 100 && buffer.length <= 800

			return buffer
			// return {
			// 	buffer,
			// 	size: isSmall ? 'small' : 'big',
			// }
		} catch (error) {
			console.log({ error, currentPath: process.cwd() })
		}
	}

	static stringifyBuffer = (buffer: Buffer) =>
		pipe(String.fromCharCode(...new Uint8Array(buffer)), btoa)

	static getImgBase64 = async (buffer: Promise<Buffer> | Buffer | undefined) =>
		pipe(await buffer, BarCodeWriter.stringifyBuffer)
}
