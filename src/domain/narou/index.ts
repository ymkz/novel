export type NarouNovel = {
  ncode: string
  title: string
  totalPage: number
  currentPage: number
  lastPublishedAt: string
}

export const parseNcodeAndPageFromUrl = (url: string) => {
  const regex = /^https:\/\/ncode.syosetu.com\/(?<ncode>n[a-zA-Z0-9]+)\/?(?<page>\d*).*$/
  const matches = regex.exec(url)
  if (!matches) {
    console.warn('なろうの小説URLではない')
    throw new Error('なろうの小説URLではない')
  }
  const { ncode, page } = matches.groups as { ncode: string; page: string }
  return { ncode, page: Number(page) }
}
