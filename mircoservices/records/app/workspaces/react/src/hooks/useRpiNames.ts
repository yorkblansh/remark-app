import axios from 'axios'
import { useEffect, useState } from 'react'
import { RpiNames } from '../interfaces/RpiNames.interface'

export const useRpiNames = () => {
	const [data, setData] = useState<RpiNames[]>([])

	useEffect(() => {
		fetch('http://localhost:85/abbrev')
			.then((data) => {
				data.json().then((d) => setData(d))
			})
			.catch((e) => {
				console.error(e)
			})
	}, [])

	return { rpiNames: data }
}
