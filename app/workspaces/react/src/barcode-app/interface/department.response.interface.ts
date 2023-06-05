interface Schedule {
	start: string | number
	end: string | number
	days: any
}

export interface DepartmentInfo {
	address: string
	cords: any
	enabled: number
	index: string | number
	phone: string
	phone_prefix: string
	postoffice_center: string
	postoffice_center_id: number
	region: string
	region_id: number
	schedule: Schedule[]
	title: string
}
