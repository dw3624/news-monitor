import {
  getChannelAArticles,
  getJTBCArticles,
  getKBSArticles,
  getMBCArticles,
  getSBSArticles,
  getTVChosunArticles,
} from '../../lib'
import { ArticleType } from '../../lib/types'

export const onRequestGet = async (context) => {
  const broadcast = context.params.catchall[0]
  const date = context.params.catchall[1]

  let res = <ArticleType[] | null>[]
  switch (broadcast.toLowerCase()) {
    case 'kbs':
      res = await getKBSArticles(date)
      break

    case 'mbc':
      res = await getMBCArticles(date)
      break

    case 'sbs':
      res = await getSBSArticles(date)
      break

    case 'jtbc':
      res = await getJTBCArticles(date)
      break

    case 'channel-a':
      res = await getChannelAArticles(date)
      break

    case 'tv-chosun':
      res = await getTVChosunArticles(date)
      break
  }
  return new Response(JSON.stringify(res))
}
