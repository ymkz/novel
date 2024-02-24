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

/**
 * YYYY-MM-DD HH:mm:ss → YYYY年MM月DD日HH時mm分
 */
export const getLastPublishedAt = (datetime: string) => {
  const date = new Date(datetime)
  return `${date.getFullYear()}年${
    date.getMonth() + 1
  }月${date.getDate()}日${date.getHours()}時${date.getMinutes()}分`
}

export const getPageInfo = (currentPage: number, totalPage: number) => {
  return `${currentPage}話／全${totalPage}話`
}

export const getOriginalNarouUrl = (ncode: string, page: number) => {
  if (page === 0) {
    return `https://ncode.syosetu.com/${ncode}/${page}`
  }
  return `https://ncode.syosetu.com/${ncode}`
}

export const getProxyNarouUrl = (ncode: string, page: number) => {
  return `/proxy/narou/${ncode}/${page}`
}

export const getViewerNarouUrl = (ncode: string, page: number) => {
  return `/viewer/narou/${ncode}/${page}`
}

export const getNarouApiUrl = (ncode: string) => {
  return `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`
}
