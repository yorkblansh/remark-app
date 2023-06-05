export const getBarcodeImageBase64 = async (index: string[]) => {
	let response: Response

	try {
		response = await fetch(
			'http://localhost:85/barcoder/barcode_image_base64',
			{
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					index,
				}),
			}
		)
	} catch (error) {
		console.log({ getBarcodeImageBase64_FETCH_ERROR: error })
	}

	let barcodeImageBase64: {
		barcodeNumber: string
		barcodeImageBase64: string
	}[]

	try {
		barcodeImageBase64 = await response.json()
	} catch (error) {
		console.log({ getBarcodeImageBase64_JSON_METHOD_ERROR: error })
	}

	return barcodeImageBase64
}
