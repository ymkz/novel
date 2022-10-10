import { FC } from 'react'
import { useDeleteNovelMutation } from '../hooks/novel'

type Props = {
  isOpen: boolean
  target: NarouItem | null
  close: () => void
}

export const NovelReader: FC<Props> = ({ isOpen, target, close }) => {
  const { deleteNovel } = useDeleteNovelMutation()

  const remove = async () => {
    if (confirm('本当に削除しますか')) {
      await deleteNovel(target?.ncode!)
      close()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="sheet-container">
      <div className="sheet-header">
        <div onClick={remove} className="delete">
          削除
        </div>
        <div onClick={close} className="close">
          閉じる
        </div>
      </div>
      <iframe
        src={`/narou/${target?.ncode}/${target?.currentPage || ''}`}
        className="sheet-content"
      />
    </div>
  )
}
