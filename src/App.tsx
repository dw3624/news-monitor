import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import ArticleCard from '@/features/news-monitor/components/article-card'
import MenuBar from '@/features/news-monitor/components/menu-bar'
import { cn } from '@/lib/utils'
import { articlesAtom, broadcastAtom, dateAtom } from '@/store'
import axios from 'axios'
import { useAtom } from 'jotai'
import { Copy, Loader2, RefreshCcw } from 'lucide-react'
import useSwr from 'swr'

export type ArticleType = {
  category: string
  title: string
  url: string
  include: boolean
  type: 'R' | string
  keyword1: string
  keyword2: string
}

const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

const convertTime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')
}

const App = () => {
  const [date, setDate] = useAtom(dateAtom)
  const [broadcast, setBroadcast] = useAtom(broadcastAtom)
  const [articles, setArticles] = useAtom(articlesAtom)

  const [textArea, setTextArea] = React.useState('')
  const generateText = (articles) => {
    let resText = ''
    articles?.map((article) => {
      if (article.include) {
        resText += `[${article.type.toUpperCase()}] ${
          article.title +
          generateKeywordText(
            article.typeRef,
            article.keyword1,
            article.keyword2,
          )
        }\n`
      }
    })
    return resText
  }

  const shouldFetch = broadcast !== 'default'
  const formattedDate = convertTime(date)
  const url = `/api/articles/${broadcast}/${formattedDate}`
  const {
    data: fetchedArticles,
    isLoading,
    mutate,
  } = useSwr(shouldFetch ? url : null, fetcher)

  React.useEffect(() => {
    if (fetchedArticles) {
      const articlesWithDefault = fetchedArticles.map((article) => ({
        ...article,
        type: 'R',
        include: false,
        keyword1: '',
        keyword2: '',
      }))
      setArticles(articlesWithDefault)
      setTextArea(
        articlesWithDefault.length > 0 ? generateText(articlesWithDefault) : '',
      )
    }
  }, [fetchedArticles, generateText, setArticles])

  const handleUpdateArticle = (
    index: number,
    updatedField: Partial<ArticleType>,
  ) => {
    setArticles((prevArticles) => {
      const newArticles = [...prevArticles]
      newArticles[index] = { ...prevArticles[index], ...updatedField }
      return newArticles
    })
  }

  const handleRefresh = () => {
    mutate()
  }

  const generateKeywordText = (
    typeRef: string,
    keyword1: string,
    keyword2: string,
  ) => {
    const keywordList = [typeRef, keyword1, keyword2].filter(Boolean)
    const keywordText = keywordList.join(', ')
    if (keywordText) {
      return `(${keywordText})`
    }
    return keywordText
  }

  const handleTextAreaChange = (event) => {
    console.log(e.target.value)
    const resText = generateText(e.target.value)

    setTextArea(resText)
  }

  let isCopySuccess = false
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textArea)
      isCopySuccess = true
      setTimeout(() => {
        isCopySuccess = false
      }, 2000)
    } catch (error) {
      console.error('Copy Failed:', error)
    }
  }

  return (
    <main className="container h-[calc(100dvh-36px)] pb-4">
      <section className="flex flex-col h-full gap-2">
        <MenuBar
          date={date}
          setDate={setDate}
          broadcast={broadcast}
          setBroadcast={setBroadcast}
        />
        <div className="flex-1 border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
              <div className="h-full w-full p-2 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm ml-2">
                    <b>{articles.length}</b> 건
                  </div>
                  <Button variant={'ghost'} size={'sm'} onClick={handleRefresh}>
                    새로고침
                    <RefreshCcw className="ml-2 h-3 w-3" />
                  </Button>
                </div>
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로딩 중...
                  </div>
                ) : (
                  <div className="max-h-[85dvh] overflow-y-auto pr-2 h-full flex flex-col gap-2">
                    {articles ? (
                      articles.map((article, i) => (
                        <ArticleCard
                          key={i}
                          index={i}
                          article={article}
                          onUpdate={handleUpdateArticle}
                        />
                      ))
                    ) : (
                      <div>기사가 없습니다.</div>
                    )}
                  </div>
                )}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle={true} />
            <ResizablePanel>
              <div className="h-full w-full p-2 space-y-2">
                <div className="flex justify-between items-center">
                  <div
                    className={cn(
                      'text-sm ml-2',
                      isCopySuccess ? 'visible' : 'invisible',
                    )}
                  >
                    복사가 성공했습니다..!
                  </div>
                  <Button variant={'ghost'} size={'sm'} onClick={handleCopy}>
                    복사
                    <Copy className="ml-2 w-3 h-3" />
                  </Button>
                </div>
                <textarea
                  className="
                  flex h-[85dvh] w-full rounded-md border border-input
                  bg-transparent text-base shadow-sm placeholder:text-muted-foreground
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                  disabled:cursor-not-allowed disabled:opacity-50 resize-none p-4"
                  // defaultValue={
                  //   articles.length > 0 ? generateText(articles) : ''
                  // }
                  value={textArea}
                  onChange={handleTextAreaChange}
                  spellCheck={false}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </main>
  )
}

export default App
