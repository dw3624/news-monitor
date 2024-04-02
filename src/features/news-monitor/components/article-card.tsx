import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { BUTTON_LIST } from '@/const'
import { cn } from '@/lib/utils'

const ArticleCard = ({ index, article, onUpdate }) => {
  const updateArticle = (updatedField) => {
    onUpdate(index, updatedField)
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={cn(
        'flex flex-col items-start gap-2 rounded-lg border p-3',
        'text-left text-sm transition-all cursor-pointer',
        article.include
          ? 'bg-accent hover:bg-accent/80'
          : 'bg-transparent hover:bg-accent',
      )}
    >
      <div className="w-full flex-1 flex flex-col gap-4">
        <div className="w-full flex justify-between gap-2">
          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="text-base font-semibold hover:underline underline-offset-4 break-keep"
          >
            {article.title}
          </a>
          <Checkbox
            onClick={() => updateArticle({ include: !article.include })}
            className="rounded-full w-6 h-6"
          />
        </div>

        <RadioGroup className="flex flex-wrap gap-2">
          {BUTTON_LIST.map((button, i) => (
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
                  article.type === button.label &&
                    'bg-primary text-primary-foreground hover:bg-primary/90',
                )}
                onClick={() => updateArticle({ type: button.label })}
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
          value={article.keyword1 || ''}
          onChange={(e) => updateArticle({ keyword1: e.target.value })}
        />
        <Input
          type="text"
          placeholder="키워드 2"
          autoComplete="on"
          className="h-8 px-0"
          value={article.keyword2 || ''}
          onChange={(e) => updateArticle({ keyword2: e.target.value })}
        />
      </div>
    </div>
  )
}

export default ArticleCard
