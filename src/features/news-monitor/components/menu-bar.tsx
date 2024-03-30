import { Button } from '@/components/ui/button'
import { DatePicker } from '@/features/news-monitor/components/date-picker'
import React from 'react'

export const BROADCAST_LIST = [
  {
    label: 'KBS',
    value: 'kbs',
  },
  {
    label: 'MBC',
    value: 'mbc',
  },
  {
    label: 'SBS',
    value: 'sbs',
  },
  {
    label: 'JTBC',
    value: 'kbs',
  },
  {
    label: '채널A',
    value: 'channel-a',
  },
  {
    label: 'TV조선',
    value: 'tv-chosun',
  },
]

const MenuBar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        {BROADCAST_LIST.map((broadcast, i) => (
          <Button key={i} variant={'ghost'}>
            {broadcast.label}
          </Button>
        ))}
      </div>
      <div>
        <DatePicker />
      </div>
    </div>
  )
}

export default MenuBar
