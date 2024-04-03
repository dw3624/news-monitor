import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { articlesAtom, textareaValueAtom } from '@/store'
import type { ArticleType } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import { Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

const generateKeywordText = (
  typeRef: boolean,
  keyword1: string,
  keyword2: string,
) => {
  const keywordList = [typeRef && '참고', keyword1, keyword2].filter(Boolean)
  const keywordText = keywordList.join(', ')
  if (keywordText) {
    return `(${keywordText})`
  }
  return keywordText
}

const generateText = (articles: ArticleType[]) => {
  let resText = ''
  articles?.map((article) => {
    if (article.include) {
      resText += `${`${article.type} ${article.title}${generateKeywordText(
        article.typeRef,
        article.keyword1,
        article.keyword2,
      )}`}\n`
    }
  })
  return resText
}

const ArticleTextarea = () => {
  const articles = useAtomValue(articlesAtom)
  const [textareaValue, setTextareaValue] = useAtom(textareaValueAtom)
  const [isCopy, setIsCopy] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textareaValue)
      setIsCopy(true)
      setTimeout(() => setIsCopy(false), 1000)
    } catch (error) {
      console.error('Copy Failed:', error)
    }
  }

  useEffect(() => {
    const resText = generateText(articles)
    setTextareaValue(resText)
  }, [articles, setTextareaValue])

  return (
    <section className="h-full w-full p-2 space-y-2 border border-input">
      <div className="flex justify-between items-center">
        <div className={cn('text-sm ml-2', isCopy ? 'visible' : 'invisible')}>
          복사가 성공했습니다.
        </div>
        <Button variant={'ghost'} size={'sm'} onClick={handleCopy}>
          복사
          <Copy className="ml-2 w-3 h-3" />
        </Button>
      </div>
      <textarea
        className="
          flex h-[calc(100%-4rem)] w-full rounded-md border border-input font-sans
          bg-transparent text-base shadow-sm placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50 resize-none p-4"
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        spellCheck={false}
      />
    </section>
  )
}

export default ArticleTextarea
