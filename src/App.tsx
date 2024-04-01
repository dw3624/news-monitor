import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { ScrollArea } from '@/components/ui/scroll-area'
import ArticleCard from '@/features/news-monitor/components/article-card'
import MenuBar from '@/features/news-monitor/components/menu-bar'
import { articlesAtom, broadcastAtom, dateAtom } from '@/store'
import axios from 'axios'
import { useAtomValue, useSetAtom } from 'jotai'
import useSwr from 'swr'

export type ArticleType = {
  category: string
  title: string
  url: string
  include: boolean
  type: string
  keyword1: string
  keyword2: string
}

const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const App = () => {
  const date = useAtomValue(dateAtom)
  const broadcast = useAtomValue(broadcastAtom)
  const setArticles = useSetAtom(articlesAtom)

  const shouldFetch = broadcast !== 'default'
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '')
  const url = `/api/articles/${broadcast}/${formattedDate}`
  const { data: fetchedArticles, error } = useSwr(
    shouldFetch ? url : null,
    fetcher,
  )

  if (error) console.error(error)

  if (shouldFetch) {
    setArticles(fetchedArticles)
  }

  return (
    <main className="container h-[calc(100dvh-36px)] pb-4">
      <section className="flex flex-col h-full gap-2">
        <MenuBar />
        <div className="flex-1 border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <ScrollArea className="h-full w-full p-2">
                <div className="flex flex-col gap-2">
                  {fetchedArticles?.map((article, i) => (
                    <ArticleCard key={i} index={i} />
                  ))}
                </div>
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle={true} />
            <ResizablePanel className="p-2">
              <textarea
                className="
                flex h-full w-full rounded-md border border-input
                bg-transparent text-sm shadow-sm placeholder:text-muted-foreground
                focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                disabled:cursor-not-allowed disabled:opacity-50 resize-none p-4"
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  )
}

export default App
