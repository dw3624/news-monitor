import ArticleCardList from '@/components/article-card-list'
import ArticleTextarea from '@/components/article-textarea'
import MenuBar from '@/components/menu-bar'
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
        <div className="max-h-[calc(100dvh-8rem)] grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 flex-1">
          <ArticleCardList
            isLoading={isLoading}
            error={error}
            mutate={mutate}
          />
          <ArticleTextarea />
        </div>
      </section>
    </main>
  )
}

export default App
