import axios from 'axios'
import useSwr from 'swr'

const convertTime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '')
}

const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const useArticles = (broadcast: string, date: Date) => {
  const formattedDate = convertTime(date)
  const url = `/api/articles/${broadcast}/${formattedDate}`
  const {
    data: fetchedArticles,
    error,
    isLoading,
    mutate,
  } = useSwr(broadcast !== 'default' ? url : null, fetcher, {
    shouldRetryOnError: false,
  })

  return { fetchedArticles, error, isLoading, mutate }
}
