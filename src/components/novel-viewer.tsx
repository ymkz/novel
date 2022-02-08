import Sheet from "react-modal-sheet"

type Props = {
  isOpen: boolean
  target: NovelForView | null
  close: () => void
  remove: () => void
}

export const NovelViewer = ({ isOpen, target, close, remove }: Props) => {
  const handleCloseEnd = () => {
    location.reload()
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
            src={`/narou/${target?.ncode}/${target?.currentPage || ""}`}
            className="sheet-content"
          />
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  )
}
