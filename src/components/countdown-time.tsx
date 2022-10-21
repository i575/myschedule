import { FC } from 'react'

type Props = {
	currentYMDHMS: string
}

export const CountdownTime: FC<Props> = ({ currentYMDHMS }) => {
	return <div className="text-xl h-[41px] flex items-center justify-center border border-arco_border rounded-tl rounded-tr">{currentYMDHMS}</div>
}
