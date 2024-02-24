export type NarouNovel = {
  ncode: string
  title: string
  totalPage: number
  currentPage: number
  lastPublishedAt: string
}

type RegexMatchGroup = {
  ncode: string
  page?: string
}

type NarouPageInfo = {
  ncode: string
  page: number
}

export const parseNcodeAndPageFromUrlPath = (url: string): NarouPageInfo => {
  const regex = /\/(?<ncode>n[a-zA-Z0-9]+)\/?(?<page>\d*).*$/
  const matches = regex.exec(url)
  if (!matches) {
    console.error(`invalid url for narou novel : url=${url}`)
    throw new Error(`invalid url for narou novel : url=${url}`)
  }
  const { ncode, page } = matches.groups as RegexMatchGroup
  return { ncode, page: Number(page) || 0 }
}
