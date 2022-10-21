import { useEffect, useMemo, useState } from 'react'
import { data, NEXT, PREV } from './data'
import { Data, TransData } from './types'
import { Button, Collapse } from '@arco-design/web-react'
import dayjs from 'dayjs'
import { CollapseComponent } from './components/collapse-component'
import { CountdownTime } from './components/countdown-time'

export const App = () => {
	const [colors, setColors] = useState<string[]>([
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
	])
	const [list, setList] = useState<TransData[]>([])
	const [activeKey, setActiveKey] = useState('0')
	const [currentTime, setCurrentTime] = useState(dayjs)
	const currentYMDHMS = currentTime.format('YYYY/MM/DD HH:mm:ss')
	const currentMinuteSecond = currentTime.format('HH:mm:ss')

	const transList = () => {
		const newList = [] as TransData[]
		const nameColors = {} as { [name: string]: string }
		let colorCurrent = 0

		data.forEach(e => {
			const { schedules } = e
			schedules.forEach(f => {
				if (nameColors[f.name]) return

				nameColors[f.name] = colors[colorCurrent++]
			})
		})

		data.forEach((e, i) => {
			newList.push({
				_id: String(i),
				name: e.name,
				schedules: e.schedules.map((f, j) => {
					const prevIndex = j - 1
					const nextIndex = j + 1
					const lastIndex = e.schedules.length - 1
					// prettier-ignore
					const startTime = f.startTime === PREV
						? e.schedules[prevIndex < 0 ? lastIndex : prevIndex].endTime
						: f.startTime
					// prettier-ignore
					const endTime = f.endTime === NEXT
						? e.schedules[nextIndex > lastIndex ? 0 : nextIndex].startTime
						: f.endTime

					return {
						...f,
						_id: String(j),
						_color: nameColors[f.name],
						startTime,
						endTime,
					}
				}),
			})
		})

		setList(newList)
	}

	const startCountdown = () => {
		let interval = setInterval(() => {
			setCurrentTime(dayjs())
		}, 1000)

		return () => clearInterval(interval)
	}

	const bootstrap = () => {
		const clearCountdown = startCountdown()

		transList()

		return () => {
			clearCountdown()
		}
	}

	useEffect(bootstrap, [])

	return (
		<div className={'flex justify-center w-[1200px] mx-auto p-2'}>
			<div className="w-1/2 pr-1">
				<CollapseComponent list={list} activeKey={activeKey} setActiveKey={setActiveKey} currentMinuteSecond={currentMinuteSecond} />
			</div>

			<div className="w-1/2 pl-1">
				<CountdownTime currentYMDHMS={currentYMDHMS} />
			</div>
		</div>
	)
}
