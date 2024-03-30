import { onRequestGet as __api_articles___catchall___ts_onRequestGet } from "C:\\works\\github\\news-monitor-react\\functions\\api\\articles\\[[catchall]].ts"
import { onRequest as __api_hello_ts_onRequest } from "C:\\works\\github\\news-monitor-react\\functions\\api\\hello.ts"

export const routes = [
    {
      routePath: "/api/articles/:catchall*",
      mountPath: "/api/articles",
      method: "GET",
      middlewares: [],
      modules: [__api_articles___catchall___ts_onRequestGet],
    },
  {
      routePath: "/api/hello",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_hello_ts_onRequest],
    },
  ]