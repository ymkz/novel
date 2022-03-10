import React from 'react'
import Sheet from 'react-modal-sheet'
import { useNovelDelete, useNovelRevalidate } from '~/view/novel-hook'

type Props = {
  isOpen: boolean
  target: NovelForView | null
  close: () => void
}

export function NovelView({ isOpen, target, close }: Props) {
  const { revalidate } = useNovelRevalidate()
  const { deleteNovel } = useNovelDelete()

  const handleCloseEnd = () => {
    revalidate()
  }

  const handleRemove = async () => {
    if (confirm('本当に削除しますか')) {
      await deleteNovel(target?.ncode!)
      close()
    }
  }

  return (
    <Sheet isOpen={isOpen} onClose={close} onCloseEnd={handleCloseEnd}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="sheet-header">
            <div onClick={handleRemove} className="delete">
              削除
            </div>
            <div onClick={close} className="close">
              閉じる
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Content>
          <iframe
            src={`/narou/${target?.ncode}/${target?.currentPage || ''}`}
            className="sheet-content"
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
