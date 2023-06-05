import { flow, pipe } from 'fp-ts/lib/function'
import * as A from 'fp-ts/lib/Array'
import fillRange from 'fill-range'

export const matchIntRange = (predicat: number) =>
	flow(
		fillRange,
		A.some((item) => item === predicat),
	)
