import { Collapse } from '@arco-design/web-react'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { Reports, TransData } from '../types'
import { Dayjs } from 'dayjs'
import { getRemainTime } from '../lib/data-helper'

type Props = {
	activeKey: string
	setActiveKey: Dispatch<SetStateAction<string>>
	currentTime: Dayjs
	list: TransData[]
	reports: Reports
}

const ColorDot: FC<{ color: string }> = ({ color }) => {
	return <span className={'w-2 h-2 mr-1 rounded-full border border-gray-400'} style={{ backgroundColor: color }} />
}

export const CollapseComponent: FC<Props> = ({ activeKey, setActiveKey, currentTime, list, reports }) => {
	const currentYMDHMS = currentTime.format('YYYY-MM-DD HH:mm:ss')
	const currentMinuteSecond = currentTime.format('HH:mm:ss')

	return (
		<Collapse className={'w-full'} accordion activeKey={activeKey} onChange={setActiveKey}>
			{list.map((e, i) => {
				const isActive = activeKey === e._id
				const schedulesLength = e.schedules.length
				let firstMatchTimeIndex = undefined as never as number
				let firstMatchName = undefined as never as string

				if (isActive) {
					for (let i = schedulesLength - 1; i < schedulesLength; i--) {
						if (i < 0) break

						const f = e.schedules[i]
						if (i > 0 ? currentMinuteSecond >= f.startTime : currentMinuteSecond >= e.schedules[schedulesLength - 1].endTime) {
							firstMatchTimeIndex = i
							firstMatchName = f.name
							break
						}
					}
				}

				return useMemo(
					() => (
						<Collapse.Item header={e.name} name={e._id} key={e._id} extra={isActive && <span>{currentYMDHMS}</span>}>
							<div className="mb-3">
								{reports[i].map(([name, color, hms], j) => (
									<div key={j} className={'inline-flex items-center mr-4 mb-1'}>
										<ColorDot color={color} />
										<span className={firstMatchName === name ? (firstMatchTimeIndex % 2 === 0 ? 'text-blue-500' : 'text-green-500') : undefined}>
											{name} {hms}
										</span>
									</div>
								))}
							</div>
							{e.schedules.map((f, j) => {
								const isGreen = j % 2 === 0
								const matchTime = j === firstMatchTimeIndex
								const wrapClassName =
									'flex items-center mb-1.5 max-[475px]:flex-col max-[475px]:items-start max-[475px]:mb-3 ' + (matchTime ? ` p-1 pr-2 -translate-x-1 ${isGreen ? 'bg-blue-100' : 'bg-green-100'}` : '')
								const tagClassName =
									'flex items-center w-[176px] pl-3 mr-2 rounded py-0.5 text-xs whitespace-nowrap max-[475px]:w-full ' +
									(isGreen ? 'bg-blue-50 border border-blue-200' : 'bg-green-50 border border-green-200')

								return (
									<div key={f._id} className={wrapClassName}>
										<span className={tagClassName}>
											<ColorDot color={f._color} />
											<span>
												{f.startTime} ~ {f.endTime} -- {f._useTime}
											</span>
										</span>
										<div className={'flex-1 inline-flex items-center justify-between max-[475px]:w-full'}>
											<span>{f.name}</span>
											{isActive && matchTime && <span className={'text-xs text-gray-600 ml-auto'}>剩下 {getRemainTime(f.startTime, f.endTime)}</span>}
										</div>
									</div>
								)
							})}
						</Collapse.Item>
					),
					[reports, isActive ? currentYMDHMS : false],
				)
			})}
		</Collapse>
	)
}
