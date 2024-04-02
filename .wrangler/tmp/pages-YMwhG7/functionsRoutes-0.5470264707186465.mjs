import { onRequestGet as __api_articles___catchall___ts_onRequestGet } from "C:\\works\\github\\news-monitor-react\\functions\\api\\articles\\[[catchall]].ts"

export const routes = [
    {
      routePath: "/api/articles/:catchall*",
      mountPath: "/api/articles",
      method: "GET",
      middlewares: [],
      modules: [__api_articles___catchall___ts_onRequestGet],
    },
  ]