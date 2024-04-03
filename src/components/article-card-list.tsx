import ArticleCard from '@/components/article-card'
import { Button } from '@/components/ui/button'
import { articlesAtom } from '@/store'
import { useAtom } from 'jotai'
import { Loader2, RefreshCcw } from 'lucide-react'
import type { KeyedMutator } from 'swr'

const LoadingMessage = () => {
  return (
    <div className="mt-6 px-2 h-full flex items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      로딩 중...
    </div>
  )
}

const ErrorMessage = ({ error }: { error: Error }) => {
  console.error(error.message)
  return (
    <div className="mt-6 px-2 h-full flex items-center justify-center text-center">
      에러가 발생했습니다.
    </div>
  )
}

const ArticleCardList = ({
  isLoading,
  error,
  mutate,
}: { isLoading: boolean; error: Error; mutate: KeyedMutator<unknown> }) => {
  const [articles] = useAtom(articlesAtom)

  const handleRefresh = () => {
    mutate()
  }

  return (
    <section className="h-full w-full p-2 space-y-2 border border-input">
      <div className="flex items-center justify-between">
        <div className="text-sm ml-2">
          <b>{isLoading ? 0 : articles.length}</b> 건
        </div>
        <Button variant={'ghost'} size={'sm'} onClick={handleRefresh}>
          새로고침
          <RefreshCcw className="ml-2 h-3 w-3" />
        </Button>
      </div>
      <div className="flex flex-col max-h-[calc(100%-4rem)] overflow-y-auto pr-2 gap-2">
        {isLoading ? (
          <LoadingMessage />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : articles.length > 0 ? (
          articles.map((_, i) => <ArticleCard key={i} index={i} />)
        ) : (
          <div className="mt-6 px-2 flex items-center justify-center">
            기사가 없습니다.
          </div>
        )}
      </div>
    </section>
  )
}

export default ArticleCardList
