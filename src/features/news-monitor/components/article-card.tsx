import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { articlesAtom } from '@/store'
import { useAtom } from 'jotai'

const buttonList = [
  {
    label: 'R',
    value: 'r',
  },
  {
    label: 'MNG',
    value: 'm',
  },
  {
    label: 'S',
    value: 's',
  },
  {
    label: '출연',
    value: 'c',
  },
  {
    label: '빈칸',
    value: 'b',
  },
]

type ArticleCardProp = {
  category?: string
  title: string
  url: string
  date?: string
  include: boolean
  type: string
  keyword1: string
  keyword2: string
}

const ArticleCard = ({
  index,
}: {
  index: number
}) => {
  const [articles, setArticles] = useAtom(articlesAtom)
  const article = articles[index]
  const updateArticle = (updatedField: Partial<ArticleCardProp>) => {
    const newArticles = [...articles]
    newArticles[index] = { ...articles[index], ...updatedField }
    setArticles(newArticles)
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => updateArticle({ include: true })}
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3',
        'text-left text-sm transition-all hover:bg-accent cursor-pointer',
      )}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div>
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold hover:underline underline-offset-4 break-keep"
          >
            {article.title}
          </a>
        </div>

        <RadioGroup defaultValue="r" className="flex flex-wrap gap-2">
          {buttonList.map((button, i) => (
            <label key={i} htmlFor={button.value}>
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
                onClick={() => updateArticle({ type: button.value })}
              >
                {button.label}
              </Button>
            </label>
          ))}
        </RadioGroup>
      </div>
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="키워드 1"
          autoComplete="on"
          className="h-8 px-0"
          value={article.keyword1}
          onChange={(e) => updateArticle({ keyword1: e.target.value })}
        />
        <Input
          type="text"
          placeholder="키워드 2"
          autoComplete="on"
          className="h-8 px-0"
          value={article.keyword2}
          onChange={(e) => updateArticle({ keyword2: e.target.value })}
        />
      </div>
    </div>
  )
}

export default ArticleCard
