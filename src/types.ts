export type Schedule = {
	startTime: string
	endTime: string
	name: string
}

export type TransSchedule = Schedule & {
	_id: string
	_color: string
}

export type Data = {
	name: string
	schedules: Schedule[]
}

export type TransData = {
	_id: string
	name: string
	schedules: TransSchedule[]
}
