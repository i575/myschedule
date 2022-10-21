import dayjs from 'dayjs'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

const _translateRemainHMS = (remainTimeMs: number, passZero = false) => {
	const remainHour = remainTimeMs / HOUR
	const remainHourString = String(Math.floor(remainHour))
	const remainMinute = (remainTimeMs / MINUTE) % 60
	const remainMinuteString = String(Math.floor(remainMinute))
	const remainSecond = (remainTimeMs / SECOND) % 60
	const remainSecondString = String(Math.ceil(remainSecond))
	const h = `${remainHourString === '0' ? (passZero ? '0h' : '') : `${remainHourString}h`}`
	const m = `${remainMinuteString === '0' ? (passZero ? '0m' : '') : `${remainMinuteString}m`}`
	const s = `${remainSecondString === '0' ? (passZero ? '0s' : '') : `${remainSecondString}s`}`

	return h + m + s
}

const getUseTimeString = (startTime: string, endTime: string, passZero = false) => {
	const todayYMD = dayjs().format('YYYY-MM-DD')
	const YMD = startTime < endTime ? todayYMD : dayjs().add(1, 'day').format('YYYY-MM-DD')
	const useTimeMs = new Date(`${YMD} ${endTime}`).getTime() - new Date(`${todayYMD} ${startTime}`).getTime()

	return _translateRemainHMS(useTimeMs, passZero)
}

const getRemainTimeString = (startTime: string, endTime: string, passZero = false) => {
	const YMD = (startTime < endTime ? dayjs() : dayjs().add(1, 'day')).format('YYYY-MM-DD')
	const remainTimeMs = new Date(`${YMD} ${endTime}`).getTime() - Date.now()

	return _translateRemainHMS(remainTimeMs, passZero)
}

export { SECOND, MINUTE, HOUR, getUseTimeString, getRemainTimeString }
