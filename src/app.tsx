import { useEffect, useMemo, useState } from 'react'
import { colors, NEXT, PREV, schedules } from './schedules'
import { ReportNameColorUseTime, Reports, TransData } from './types'
import dayjs from 'dayjs'
import { CollapseComponent } from './components/collapse-component'
import { getUseTime, translateRemainHMS } from './lib/data-helper'

export const App = () => {
	const [list, setList] = useState<TransData[]>([])
	const [activeKey, setActiveKey] = useState('0')
	const [currentTime, setCurrentTime] = useState(dayjs)

	const reports = useMemo<Reports>(() => {
		if (list.length === 0) return []

		const result = [] as ReportNameColorUseTime[]

		list.forEach(e => {
			const nameUseTime = {} as ReportNameColorUseTime

			e.schedules.forEach(f => {
				if (nameUseTime[f.name]) {
					nameUseTime[f.name][1] += getUseTime(f.startTime, f.endTime, false) as number
				} else {
					nameUseTime[f.name] = [f._color, getUseTime(f.startTime, f.endTime, false) as number]
				}
			})

			result.push(nameUseTime)
		})

		return result.map(e => Object.entries(e).map(([name, [color, timeMs]]) => [name, color, translateRemainHMS(timeMs)]))
	}, [list])

	const transList = () => {
		const newList = [] as TransData[]
		const nameColors = {} as { [name: string]: string }
		let colorCurrent = 0

		schedules.forEach(e => {
			const { schedules } = e
			schedules.forEach(f => {
				if (nameColors[f.name]) return

				nameColors[f.name] = colors[colorCurrent++]
			})
		})

		schedules.forEach((e, i) => {
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
						_useTime: getUseTime(startTime, endTime) as string,
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
		<div className={'flex justify-center w-[768px] max-w-full mx-auto p-4'}>
			<CollapseComponent list={list} reports={reports} activeKey={activeKey} setActiveKey={setActiveKey} currentTime={currentTime} />
		</div>
	)
}
