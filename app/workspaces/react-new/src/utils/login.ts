import { pipe } from 'fp-ts/es6/function'

export const login = () =>
	pipe(
		fetch(`http://localhost:85/`, {
			method: 'GET',
			// headers: { 'content-type': 'application/json' },
			// body: JSON.stringify({
			// 	type,
			// 	date_from,
			// }),
		}).then((a) => {
			console.log(a)
		})
	)
