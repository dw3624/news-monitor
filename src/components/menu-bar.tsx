import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate } from '@/lib/utils'
import { selectedBroadcastAtom, selectedDateAtom } from '@/store'
import { BROADCAST_LIST } from '@/store/const'
import { useAtom } from 'jotai'
import { Calendar as CalendarIcon } from 'lucide-react'

const MenuBar = () => {
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
  const [selectedBroadcast, setSelectedBroadcast] = useAtom(
    selectedBroadcastAtom,
  )

  const handleDateSelect = (day: Date | undefined) => {
    if (day) {
      setSelectedDate(day)
    }
  }

  return (
    <div className="flex flex-wrap justify-between gap-2">
      <div className="flex gap-1">
        {BROADCAST_LIST.map((broadcastItem, i) => (
          <Button
            key={i}
            variant={'outline'}
            onClick={() => setSelectedBroadcast(broadcastItem.value)}
            className={cn(
              'px-3 h-8 font-semibold',
              selectedBroadcast === broadcastItem.value &&
                'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80',
            )}
          >
            {broadcastItem.label}
          </Button>
        ))}
      </div>
      <div>
        <Popover>
          <PopoverTrigger asChild={true}>
            <Button
              variant={'outline'}
              className={cn(
                'h-8 w-[180px] pl-3 text-left font-normal',
                !selectedDate && 'text-muted-foreground',
              )}
            >
              {selectedDate ? (
                formatDate(selectedDate)
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) =>
                date > new Date() || date < new Date('1900-01-01')
              }
              initialFocus={true}
              required={true}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default MenuBar
