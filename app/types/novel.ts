export type NovelFromKv = {
  ncode: string
  currentPage: number
}

export type NovelFromNarouApi = {
  ncode: string
  title: string
  author: string
  totalPage: number
  lastPublishedAt: number
}

export type NovelForView = NovelFromNarouApi & {
  currentPage: number
}
