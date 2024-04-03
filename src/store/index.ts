import { ARTICLE_LIST } from '@/store/test'
import type { ArticleType } from '@/types'
import { atom, useAtom } from 'jotai'

export const selectedDateAtom = atom(new Date())

export const selectedBroadcastAtom = atom('default')

export const articlesAtom = atom(ARTICLE_LIST)

export const updateArticle = (
  index: number,
  updatedField: Partial<ArticleType>,
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [articles, setArticles] = useAtom(articlesAtom)
  const newArticles = [...articles]
  newArticles[index] = { ...articles[index], ...updatedField }
  setArticles(newArticles)
}

export const filteredArticlesAtom = atom((get) => {
  const articles = get(articlesAtom)
  return articles.filter((article) => article.type !== 'r')
})

export const textareaValueAtom = atom('')
