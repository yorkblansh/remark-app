import { pipe } from 'fp-ts/lib/function'
import axios from 'axios'
import internal from 'stream'

export const fetchPDFStream = async ({ html, options }) =>
	pipe(
		await axios.post<internal.Readable>(
			`http://${process.env.FORMS_API_IP}:86/pdf-generate`,
			{ returnType: 'stream', html, options },
			{
				timeout: 20000,
				timeoutErrorMessage: 'timesout exception',
				responseType: 'stream',
			},
		),
		(axiosResponse) => axiosResponse.data,
	)
