import dayjs from 'dayjs'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

const translateRemainHMS = (remainTimeMs: number, passZero = false) => {
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

const getUseTime = (startTime: string, endTime: string, parsed = true, passZero = false): string | number => {
	const todayYMD = dayjs().format('YYYY-MM-DD')
	const YMD = startTime < endTime ? todayYMD : dayjs().add(1, 'day').format('YYYY-MM-DD')
	const useTimeMs = dayjs(`${YMD} ${endTime}`).valueOf() - dayjs(`${todayYMD} ${startTime}`).valueOf()
	if (parsed) return translateRemainHMS(useTimeMs, passZero)
	return useTimeMs
}

const getRemainTime = (startTime: string, endTime: string, parsed = true, passZero = false): string | number => {
	const YMD = (startTime < endTime || startTime > dayjs().format('HH:mm') ? dayjs() : dayjs().add(1, 'day')).format('YYYY-MM-DD')
	const remainTimeMs = dayjs(`${YMD} ${endTime}`).valueOf() - Date.now()

	if (parsed) return translateRemainHMS(remainTimeMs, passZero)
	return remainTimeMs
}

export { SECOND, MINUTE, HOUR, getUseTime, getRemainTime, translateRemainHMS }
