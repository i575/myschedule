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
	eat: '用餐',
}

const colors = [
	'#FF8787',
	'#F8C4B4',
	'#E5EBB2',
	'#BCE29E',
	'#FAF7F0',
	'#CDFCF6',
	'#BCCEF8',
	'#98A8F8',
	'#FFD372',
	'#FF99D7',
	'#D58BDD',
	'#905E96',
	'#A1C298',
	'#C6EBC5',
	'#FBF2CF',
	'#FA7070',
	'#89CFFD',
	'#FBDF07',
	'#FF7F3F',
	'#F94892',
	'#B2A4FF',
	'#FFB4B4',
	'#FFDEB4',
	'#FFF9CA',
	'#F37878',
	'#FAD9A1',
	'#F9F9C5',
	'#D9F8C4',
]

const schedules: Data[] = [
	{
		name: '工作日',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.work },
			{ startTime: '08:00', endTime: NEXT, name: names.code },
			{ startTime: '09:30', endTime: NEXT, name: names.work },
			{ startTime: '12:00', endTime: NEXT, name: names.swingHands },
			{ startTime: '12:30', endTime: NEXT, name: names.meditation },
			{ startTime: '13:00', endTime: NEXT, name: names.work },
			{ startTime: '19:00', endTime: NEXT, name: names.eat },
			{ startTime: '20:15', endTime: NEXT, name: names.code },
			{ startTime: '21:15', endTime: NEXT, name: names.english },
			{ startTime: '23:15', endTime: NEXT, name: names.fitness },
		],
	},
	{
		name: '非工作日(抱石)',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.code },
			{ startTime: '09:15', endTime: NEXT, name: names.swingHands },
			{ startTime: '09:45', endTime: NEXT, name: names.meditation },
			{ startTime: '10:15', endTime: NEXT, name: names.bouldering },
			{ startTime: '17:30', endTime: NEXT, name: names.eat },
			{ startTime: '19:00', endTime: NEXT, name: names.code },
			{ startTime: '21:00', endTime: NEXT, name: names.english },
			{ startTime: '23:15', endTime: NEXT, name: names.fitness },
		],
	},
	{
		name: '非工作日(無抱石)',
		schedules: [
			{ startTime: '00:15', endTime: NEXT, name: names.sleep },
			{ startTime: '06:30', endTime: NEXT, name: names.wakeup },
			{ startTime: '07:00', endTime: NEXT, name: names.code },
			{ startTime: '12:00', endTime: NEXT, name: names.swingHands },
			{ startTime: '12:30', endTime: NEXT, name: names.meditation },
			{ startTime: '13:00', endTime: NEXT, name: names.code },
			{ startTime: '17:30', endTime: NEXT, name: names.eat },
			{ startTime: '19:00', endTime: NEXT, name: names.english },
			{ startTime: '23:15', endTime: NEXT, name: names.fitness },
		],
	},
]

export { PREV, NEXT, colors, schedules }
