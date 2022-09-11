import { FC } from 'react'

type Props = {
  novel: NarouItem
  open: (novel: NarouItem) => void
}

export const NovelItem: FC<Props> = ({ novel, open }) => {
  const handleClickToView = () => {
    open(novel)
  }

  return (
    <li onClick={handleClickToView} className="item">
      <div className="title">{novel.title}</div>
      <div className="page">
        {novel.currentPage}話／全{novel.totalPage}話
      </div>
      <div className="date">{novel.lastPublishedAt}</div>
      <div className="url">{`https://ncode.syosetu.com/${novel.ncode}/${novel.currentPage}`}</div>
    </li>
  )
}
