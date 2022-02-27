import React from 'react'
import Sheet from 'react-modal-sheet'
import { useNovelRevalidate } from '~/view/novel-hook'

type Props = {
  isOpen: boolean
  target: NovelForView | null
  close: () => void
  remove: () => void
}

export function NovelView({ isOpen, target, close, remove }: Props) {
  const { revalidate } = useNovelRevalidate()

  const handleCloseEnd = () => {
    revalidate()
  }

  return (
    <Sheet isOpen={isOpen} onClose={close} onCloseEnd={handleCloseEnd}>
      <Sheet.Container>
        <Sheet.Header>
          <div className="sheet-header">
            <div onClick={remove} className="delete">
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
