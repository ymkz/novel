import { FC } from 'react'
import { openNovelViewer } from '../helpers/store'
import { NarouItem } from '../models/narou'

type NovelItemProps = {
  novel: NarouItem
}

export const NovelItem: FC<NovelItemProps> = ({ novel }) => {
  const handleOpen = () => {
    openNovelViewer(novel)
  }

  return (
    <li onClick={handleOpen} className="novel-item">
      <div className="novel-item__title">{novel.title}</div>
      <div className="novel-item__page">
        {novel.currentPage}話／全{novel.totalPage}話
      </div>
      <div className="novel-item__date">{novel.lastPublishedAt}</div>
      <div className="novel-item__url">{`https://ncode.syosetu.com/${novel.ncode}`}</div>
    </li>
  )
}
