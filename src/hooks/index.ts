import { ARTICLE_LIST } from '@/test'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url: string) => axios.get(url).then((res) => res)

export const useArticles = (broadcast: string, date: string) => {
  const { data, error, isLoading } = useSWR(
    broadcast !== 'default' ? `/api/articles/${broadcast}/${date}` : null,
    fetcher,
    {
      fallback: { '/api/articles/default': ARTICLE_LIST },
    },
  )

  return { data, error, isLoading }
}
