import { Request as IttyRequest } from 'itty-router'

export type Env = {
  DB: KVNamespace
  ENVIRONMENT: 'development' | 'production'
}

export type WorkerRequest = Request & IttyRequest

export type NovelContent = {
  ncode: string
  title: string
  author: string
  totalPage: number
  updatedAt: number
}

export type NovelInfo = NovelContent & {
  currentPage: number
}

export type PostBody = {
  url: string
}

export type PatchBody = {
  url: string
}

export type DeleteBody = {
  ncode: string
}

type NarouApiResponseAllCount = {
  allcount: number
}

type NarouApiResponseNovelData = {
  title: string
  ncode: string
  userid: number
  writer: string
  story: string
  biggenre: number
  genre: number
  gensaku: string
  keyword: string
  general_firstup: string
  general_lastup: string
  novel_type: number
  end: number
  general_all_no: number
  length: number
  time: number
  isstop: number
  isr15: number
  isbl: number
  isgl: number
  iszankoku: number
  istensei: number
  istenni: number
  pc_or_k: number
  global_point: number
  daily_point: number
  weekly_point: number
  monthly_point: number
  quarter_point: number
  yearly_point: number
  fav_novel_cnt: number
  impression_cnt: number
  review_cnt: number
  all_point: number
  all_hyoka_cnt: number
  sasie_cnt: number
  kaiwaritu: number
  novelupdated_at: string
  updated_at: string
}

export type NarouApiResponse = [
  NarouApiResponseAllCount,
  NarouApiResponseNovelData
]
