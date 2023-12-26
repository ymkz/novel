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

export const getOriginalNarouUrl = (ncode: string, page?: string) => {
  if (page) {
    return `https://ncode.syosetu.com/${ncode}/${page}`
  }

  return `https://ncode.syosetu.com/${ncode}`
}

export const getProxiedNarouUrl = (ncode: string, page?: string) => {
  if (page) {
    return `/proxy/narou/${ncode}/${page}`
  } else {
    return `/proxy/narou/${ncode}`
  }
}

export const getViewerNarouUrl = (ncode: string, page: number) => {
  if (page === 0) {
    return `/viewer/narou/${ncode}`
  } else {
    return `/viewer/narou/${ncode}/${page}`
  }
}

export const getNarouApiUrl = (ncode: string) => {
  return `https://api.syosetu.com/novelapi/api?out=json&lim=500&ncode=${ncode}`
}
