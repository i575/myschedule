import { Data } from './types'

const PREV = 'prev'
const NEXT = 'next'

const names = {
	sleep: '睡覺',
	wakeup: '起床 + 洗澡',
	code: '程式',
	work: '工作',
	english: '英文',
	swingHands: '甩手',
	meditation: '冥想',
	happyTime: '娛樂時光',
	fitness: '健身、劈腿',
	bouldering: '抱石',
}

const data: Data[] = [
	{
		name: '平日',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.work },
			{ startTime: '08:00', endTime: NEXT, name: names.code },
			{ startTime: '09:30', endTime: NEXT, name: names.work },
			{ startTime: '12:00', endTime: NEXT, name: names.swingHands },
			{ startTime: '12:30', endTime: NEXT, name: names.meditation },
			{ startTime: '13:00', endTime: NEXT, name: names.work },
			{ startTime: '18:00', endTime: NEXT, name: names.happyTime },
			{ startTime: '20:30', endTime: NEXT, name: names.english },
			{ startTime: '22:00', endTime: NEXT, name: names.code },
			{ startTime: '23:15', endTime: NEXT, name: names.fitness },
		],
	},
	{
		name: '假日(抱石)',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.code },
			{ startTime: '09:15', endTime: NEXT, name: names.swingHands },
			{ startTime: '09:45', endTime: NEXT, name: names.meditation },
			{ startTime: '10:15', endTime: NEXT, name: names.bouldering },
			{ startTime: '16:00', endTime: NEXT, name: names.english },
			{ startTime: '17:30', endTime: NEXT, name: names.happyTime },
			{ startTime: '20:00', endTime: NEXT, name: names.english },
			{ startTime: '21:00', endTime: NEXT, name: names.code },
			{ startTime: '22:30', endTime: NEXT, name: names.fitness },
		],
	},
	{
		name: '假日(無抱石)',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.code },
			{ startTime: '12:00', endTime: NEXT, name: names.swingHands },
			{ startTime: '12:30', endTime: NEXT, name: names.meditation },
			{ startTime: '13:00', endTime: NEXT, name: names.english },
			{ startTime: '17:00', endTime: NEXT, name: names.happyTime },
			{ startTime: '20:00', endTime: NEXT, name: names.english },
			{ startTime: '21:00', endTime: NEXT, name: names.code },
			{ startTime: '22:30', endTime: NEXT, name: names.fitness },
		],
	},
]

export { PREV, NEXT, data }
