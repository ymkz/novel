import { FC } from 'react'

type Props = {
  novel: NarouItem
}

export const NovelItem: FC<Props> = ({ novel }) => {
  const link = novel.currentPage
    ? `/narou/${novel.ncode}/${novel.currentPage}`
    : `/narou/${novel.ncode}`

  return (
    <a href={link} className="item">
      <div className="title">{novel.title}</div>
      <div className="page">
        {novel.currentPage}話／全{novel.totalPage}話
      </div>
      <div className="date">{novel.lastPublishedAt}</div>
      <div className="url">{`https://ncode.syosetu.com/${novel.ncode}`}</div>
    </a>
  )
}
