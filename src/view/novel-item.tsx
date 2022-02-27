import React from 'react'

type Props = {
  novel: NovelForView
  open: (novel: NovelForView) => void
}

export function NovelItem({ novel, open }: Props) {
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
    </li>
  )
}
