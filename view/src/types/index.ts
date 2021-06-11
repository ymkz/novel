export type NovelContent = {
  ncode: string
  title: string
  author: string
  totalPage: number
  updatedAt: string
}

export type NovelInfo = NovelContent & {
  currentPage: number
}
