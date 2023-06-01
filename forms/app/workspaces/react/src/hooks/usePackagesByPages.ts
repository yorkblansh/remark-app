import _ from 'lodash'
import { pipe } from 'fp-ts/lib/function'

interface Props<T extends unknown[]> {
	packages: T
	firstPageRange: number
	middlePagesRange: number
}

export interface DividedPackages<T extends unknown> {
	firstPagePackages: T
	middlePagePackagesList: T[]
	lastPagePackages: T
}

export const usePackagesByPages = <T extends unknown[]>({
	firstPageRange,
	middlePagesRange,
	packages,
}: Props<T>) => {
	let firstPagePackages = packages.filter((v, index) => index < firstPageRange)
	let middlePagePackagesList: unknown[][] = []
	let lastPagePackages: unknown[] = []

	if (packages.length - firstPageRange >= middlePagesRange * 2) {
		let middleElements = packages.filter((v, index) => index >= firstPageRange)
		let prevIndexPredicat: number = 0

		let middleChunked = pipe(
			Math.floor((packages.length - firstPageRange) / middlePagesRange),
			_.range,
			(utilArr) =>
				utilArr.map((v, i) => {
					const indexPredicat = middlePagesRange * (i + 1)
					const middleChunks = middleElements.filter(
						(v, index) => index <= indexPredicat && index > prevIndexPredicat
					)
					prevIndexPredicat = indexPredicat
					return middleChunks
				})
		)

		const lastElements = middleElements.filter(
			(v, index) => index >= prevIndexPredicat
		)
		middleChunked.push(lastElements)
		middlePagePackagesList = middleChunked.filter(
			(list) => list.length === middlePagesRange
		)

		lastPagePackages = middleChunked
			.filter((list) => list.length !== middlePagesRange)
			.flat()
		// console.log({ lastPagePackages: lastPagePackages.flat() })
	} else {
		let middleArr = packages.filter((v, index) => index >= firstPageRange)
		if (middleArr.length > middlePagesRange) {
			middlePagePackagesList[0] = middleArr.filter(
				(v, index) => index < middlePagesRange
			)
			lastPagePackages = middleArr.filter(
				(v, index) => index >= middlePagesRange
			)
		} else {
			lastPagePackages = middleArr
		}
	}
	return {
		firstPagePackages,
		middlePagePackagesList,
		lastPagePackages,
	} as DividedPackages<T>
}
