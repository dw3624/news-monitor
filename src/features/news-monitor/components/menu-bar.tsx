import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, formatDate } from '@/lib/utils'
import { broadcastAtom, dateAtom } from '@/store'
import { useAtom } from 'jotai'
import { Calendar as CalendarIcon } from 'lucide-react'

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
    value: 'jtbc',
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

// const fetcher = async (url) => {
//   const response = await axios.get(url)
//   return response.data
// }

const MenuBar = () => {
  const [date, setDate] = useAtom(dateAtom)
  const [broadcast, setBroadcast] = useAtom(broadcastAtom)
  // const setArticles = useSetAtom(articlesAtom)

  // const shouldFetch = broadcast !== 'default'
  // const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '')
  // const url = `/api/articles/${broadcast}/${formattedDate}`
  // const { data: fetchedArticles, error } = useSwr(
  //   shouldFetch ? url : null,
  //   fetcher,
  // )

  // if (error) console.error(error)

  // if (shouldFetch) {
  //   setArticles(fetchedArticles)
  // }

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
              initialFocus={true}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default MenuBar
