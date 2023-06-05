import NumberToWordsRu from 'number-to-words-ru' // ES6

export const numberToWord = (n: number) =>
	NumberToWordsRu.convert(n, {
		showNumberParts: { fractional: false },
		currency: {
			currencyNameCases: ['', '', ''],
			fractionalPartNameCases: ['', '', ''],
		},
	})
