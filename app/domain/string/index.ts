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
  // page=0のケースでpageの省略を考慮すべきかも
  // ncodeのみのURLが表示用にほしい場合もあるので分けてもいいかも
  return `https://ncode.syosetu.com/${ncode}/${page}`
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
