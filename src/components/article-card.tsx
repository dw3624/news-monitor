import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { articlesAtom } from '@/store'
import { BUTTON_LIST } from '@/store/const'
import type { ArticleType } from '@/types'
import { useAtom } from 'jotai'

const ArticleCard = ({ index }: { index: number }) => {
  const [articles, setArticles] = useAtom(articlesAtom)
  const handleUpdateArticle = (updatedField: Partial<ArticleType>) => {
    setArticles((prevArticles) => {
      return [
        ...prevArticles.slice(0, index),
        { ...prevArticles[index], ...updatedField },
        ...prevArticles.slice(index + 1),
      ]
    })
  }

  const article = articles[index]

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3',
        article.include ? 'bg-accent/80' : 'bg-transparent',
      )}
    >
      <div className="w-full flex-1 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold tracking-wider hover:underline underline-offset-4 break-keep"
          >
            {article.title}
          </a>
          <Checkbox
            checked={article.include}
            onClick={() => handleUpdateArticle({ include: !article.include })}
            className="rounded-full w-6 h-6"
          />
        </div>
        <div className="flex justify-between">
          <RadioGroup className="flex flex-wrap gap-2">
            {BUTTON_LIST.map((button, bi) => {
              return (
                <label key={bi} htmlFor={button.value}>
                  <RadioGroupItem
                    value={button.value}
                    id={button.value}
                    className="hidden"
                  />
                  <Button
                    variant={'outline'}
                    size={'sm'}
                    className={cn(
                      'text-xs h-7',
                      article.type === button.value &&
                        'bg-primary text-primary-foreground hover:bg-primary/90',
                    )}
                    onClick={() => handleUpdateArticle({ type: button.value })}
                  >
                    {button.label}
                  </Button>
                </label>
              )
            })}
          </RadioGroup>
          <Button
            variant={'reference'}
            size={'sm'}
            className={cn(
              'text-xs h-7',
              article.typeRef &&
                'bg-blue-500 text-primary-foreground hover:bg-blue-500/80',
            )}
            onClick={() => handleUpdateArticle({ typeRef: !article.typeRef })}
          >
            참고
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="키워드1"
          value={article.keyword1}
          onChange={(e) => handleUpdateArticle({ keyword1: e.target.value })}
          autoComplete="on"
          className="h-8 px-0"
        />
        <Input
          type="text"
          placeholder="키워드2"
          value={article.keyword2}
          onChange={(e) => handleUpdateArticle({ keyword2: e.target.value })}
          autoComplete="on"
          className="h-8 px-0"
        />
      </div>
    </div>
  )
}

export default ArticleCard
