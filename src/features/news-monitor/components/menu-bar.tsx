import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { BROADCAST_LIST } from '@/const'
import { cn, formatDate } from '@/lib/utils'
import { Calendar as CalendarIcon } from 'lucide-react'

const MenuBar = ({ date, setDate, broadcast, setBroadcast }) => {
  // const [date, setDate] = useAtom(dateAtom)
  // const [broadcast, setBroadcast] = useAtom(broadcastAtom)

  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        {BROADCAST_LIST.map((broadcastItem, i) => (
          <Button
            key={i}
            variant={'ghost'}
            onClick={() => setBroadcast(broadcastItem.value)}
            className={cn(
              'px-3 h-8 font-semibold',
              broadcast === broadcastItem.value &&
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
                !date && 'text-muted-foreground',
              )}
            >
              {date ? formatDate(date) : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
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
