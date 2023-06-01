import { DepartmentInfo } from '../interface/department.response.interface'

export const getDepartmentInfo = async (index: string | number) => {
	let response: Response

	try {
		response = await fetch('http://localhost:85/department', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ index }),
		})
	} catch (error) {
		console.log({ getDepartmentInfo_FETCH_ERROR: error })
	}

	let departmentInfo: DepartmentInfo

	try {
		departmentInfo = await response.json()
	} catch (error) {
		console.log({ getDepartmentInfo_JSON_METHOD_ERROR: error, departmentInfo })
	}

	try {
		console.log({ text: await response.text() })
	} catch (error) {
		console.log({ getDepartmentInfo_JSON_METHOD_ERROR__trytext: error })
	}

	return departmentInfo
}
