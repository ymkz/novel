/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

type AppEnv = {
  Bindings: {
    KV_NOVEL: KVNamespace<'novel-data'>
  }
}

type Novel = {
  ncode: string
  title: string
  author: string
  totalPage: number
  currentPage: number
  lastPublishedAt: string
}
