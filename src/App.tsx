import ArticleCardList from '@/components/article-card-list'
import ArticleTextarea from '@/components/article-textarea'
import MenuBar from '@/components/menu-bar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useArticles } from '@/hooks'

import { articlesAtom, selectedBroadcastAtom, selectedDateAtom } from '@/store'
import type { ArticleType } from '@/types'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'

const App = () => {
  const selectedDate = useAtomValue(selectedDateAtom)
  const selectedBroadcast = useAtomValue(selectedBroadcastAtom)
  const setArticles = useSetAtom(articlesAtom)

  const { fetchedArticles, error, isLoading, mutate } = useArticles(
    selectedBroadcast,
    selectedDate,
  )

  useEffect(() => {
    if (fetchedArticles) {
      const articles = fetchedArticles.map((article: ArticleType) => ({
        ...article,
        category: '',
        type: '[R]',
        include: false,
        typeRef: false,
        keyword1: '',
        keyword2: '',
      }))
      setArticles(articles)
    }
  }, [fetchedArticles, setArticles])

  useEffect(() => {
    if (error) {
      console.error('Error fetching data:', error)
    }
  }, [error])

  return (
    <main className="container h-[calc(100dvh-48px)] pb-4">
      <section className="flex flex-col h-full gap-2">
        <MenuBar />
        <div className="flex-1 border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <ArticleCardList
                isLoading={isLoading}
                error={error}
                mutate={mutate}
              />
            </ResizablePanel>
            <ResizableHandle withHandle={true} />
            <ResizablePanel>
              <ArticleTextarea />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  )
}

export default App
