export type ArticleType = {
  category?: string
  title: string
  url: string | undefined
  date: string
}

export type KBSArticleType = {
  menuName: string
  newsTitle: string
  newsCode: string
  serviceTime: string
}

export type ChannelAArticleType = {
  SVC_START_DATE: string
  TITLE: string
  PUBLISH_ID: string
}
