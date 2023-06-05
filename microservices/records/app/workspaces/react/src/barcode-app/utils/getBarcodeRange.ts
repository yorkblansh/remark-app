export const getBarcodeRange = async (index: string, amount: number) => {
	let response: Response

	try {
		response = await fetch('http://localhost:85/barcoder/getrange', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				index,
				amount,
			}),
		})
	} catch (error) {
		console.log({ getBarcodeRange_FETCH_ERROR: error })
	}

	let barcodeRange: string[]

	try {
		barcodeRange = await response.json()
	} catch (error) {
		console.log({ getBarcodeRange_JSON_METHOD_ERROR: error })
	}

	return barcodeRange
}
