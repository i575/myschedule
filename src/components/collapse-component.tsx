import { Collapse } from '@arco-design/web-react'
import { Dispatch, FC, SetStateAction, useMemo } from 'react'
import { TransData } from '../types'
import { Dayjs } from 'dayjs'
import { getRemainTimeString } from '../lib/data-helper'

type Props = {
	activeKey: string
	setActiveKey: Dispatch<SetStateAction<string>>
	currentTime: Dayjs
	list: TransData[]
}

export const CollapseComponent: FC<Props> = ({ activeKey, setActiveKey, currentTime, list }) => {
	const currentYMDHMS = currentTime.format('YYYY-MM-DD HH:mm:ss')
	const currentMinuteSecond = currentTime.format('HH:mm:ss')

	return (
		<Collapse className={'w-full'} accordion activeKey={activeKey} onChange={setActiveKey}>
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

				return useMemo(
					() => (
						<Collapse.Item header={e.name} name={e._id} key={e._id} extra={isActive && <span>{currentYMDHMS}</span>}>
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
											<span className={'w-2 h-2 mr-1 rounded-full border border-gray-400'} style={{ backgroundColor: f._color }} />
											<span>
												{f.startTime} ~ {f.endTime} -- {f._useTime}
											</span>
										</span>
										<div className={'flex-1 inline-flex items-center justify-between max-[475px]:w-full'}>
											<span>{f.name}</span>
											{isActive && matchTime && <span className={'text-xs text-gray-600 ml-auto'}>剩下 {getRemainTimeString(f.startTime, f.endTime)}</span>}
										</div>
									</div>
								)
							})}
						</Collapse.Item>
					),
					[isActive ? currentYMDHMS : false],
				)
			})}
		</Collapse>
	)
}
