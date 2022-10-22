export type Schedule = {
	startTime: string
	endTime: string
	name: string
	important?: boolean
}

export type TransSchedule = Schedule & {
	_id: string
	_color: string
	_useTime: string
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

export type ReportScheduleColor = string
export type ReportScheduleName = string
export type ReportScheduleHMS = string
export type ReportNameColorUseTime = {
	[name: ReportScheduleName]: {
		color: ReportScheduleColor
		useTime: number
		important: boolean
	}
}
export type Report = {
	name: ReportScheduleName
	color: ReportScheduleColor
	hms: ReportScheduleHMS
	important: boolean
}
export type Reports = Report[][]
