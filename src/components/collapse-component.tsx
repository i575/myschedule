import { Collapse } from '@arco-design/web-react'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { TransData } from '../types'
import dayjs from 'dayjs'

type Props = {
	activeKey: string
	setActiveKey: Dispatch<SetStateAction<string>>
	currentMinuteSecond: string
	list: TransData[]
}

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60

const getRemainTimeString = (startTime: string, endTime: string) => {
	const formatDate = (startTime < endTime ? dayjs() : dayjs().add(1, 'day')).format('YYYY-MM-DD')
	const remainTime = new Date(`${formatDate} ${endTime}`).getTime() - Date.now()
	const remainHour = remainTime / HOUR
	const remainHourString = String(Math.floor(remainHour))
	const remainMinute = (remainTime / MINUTE) % 60
	const remainMinuteString = String(Math.floor(remainMinute))
	const remainSecond = (remainTime / SECOND) % 60
	const remainSecondString = String(Math.ceil(remainSecond))

	return `${remainHourString === '0' ? '' : `${remainHourString}h`}${remainMinuteString === '0' ? '' : `${remainMinuteString}m`}${remainSecondString === '0' ? '' : `${remainSecondString}s`}`
}

export const CollapseComponent: FC<Props> = ({ activeKey, setActiveKey, currentMinuteSecond, list }) => {
	return (
		<Collapse accordion activeKey={activeKey} onChange={setActiveKey}>
			{list.map(e => {
				const isActive = activeKey === e._id
				const schedulesLength = e.schedules.length
				let firstMatchTimeIndex = undefined as never as number

				if (isActive) {
					for (let i = schedulesLength - 1; i < schedulesLength; i--) {
						const f = e.schedules[i]
						if (currentMinuteSecond >= f.startTime) {
							firstMatchTimeIndex = i
							break
						}
					}
				}

				return (
					<Collapse.Item header={e.name} name={e._id} key={e._id}>
						{e.schedules.map((f, j) => {
							const isGreen = j % 2 === 0
							const matchTime = j === firstMatchTimeIndex

							return (
								<div key={f._id} className={'flex items-center mb-1.5' + (matchTime ? ` p-1 ${isGreen ? 'bg-blue-100' : 'bg-green-100'}` : '')}>
									<span className={'flex items-center mr-2 rounded px-3 py-0.5 text-xs ' + (isGreen ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200')}>
										<span className={'w-2 h-2 mr-1 rounded-full border border-gray-400'} style={{ backgroundColor: f._color }} />
										<span>
											{f.startTime} ~ {f.endTime}
										</span>
									</span>
									<span>{f.name}</span>
									{isActive && matchTime && <span className={'text-xs text-gray-600 ml-auto'}>剩下 {getRemainTimeString(f.startTime, f.endTime)}</span>}
								</div>
							)
						})}
					</Collapse.Item>
				)
			})}
		</Collapse>
	)
}
