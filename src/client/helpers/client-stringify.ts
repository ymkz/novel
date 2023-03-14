export const generatePageInfo = (novel: Novel) => {
  return `${novel.currentPage}話／全${novel.totalPage}話`
}

export const generateNcodeCaption = (novel: Novel) => {
  return `https://ncode.syosetu.com/${novel.ncode}`
}

export const generateIframeSrc = (novel: Novel) => {
  if (novel.currentPage === 0) {
    return `/api/narou/${novel.ncode}`
  } else {
    return `/api/narou/${novel.ncode}/${novel.currentPage}`
  }
}
