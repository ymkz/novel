import { useMutation } from '@tanstack/react-query'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useSnapshot } from 'valtio'
import { deleteNovel } from '../api/novel'
import { closeNovelViewer, novelViewerState } from '../helpers/store'

export const NovelViewer = () => {
  const novelViewer = useSnapshot(novelViewerState)

  const novelDeleteMutation = useMutation({
    mutationFn: deleteNovel,
    onSuccess: () => {
      closeNovelViewer()
    },
  })

  const handleDelete = () => {
    if (novelViewer.open) {
      novelDeleteMutation.mutate({ ncode: novelViewer.novel.ncode })
    }
  }

  const handleClose = () => {
    closeNovelViewer()
  }

  if (novelViewer.open) {
    const src =
      novelViewer.novel.currentPage === 0
        ? `/api/narou/${novelViewer.novel.ncode}`
        : `/api/narou/${novelViewer.novel.ncode}/${novelViewer.novel.currentPage}`

    return (
      <Drawer
        open={novelViewer.open}
        onClose={handleClose}
        lockBackgroundScroll
        duration={100}
        direction="bottom"
        size="94vh"
      >
        <div className="novel-viewer__header">
          <button
            className="novel-viewer__button--close"
            onClick={handleDelete}
          >
            削除
          </button>
          <button
            className="novel-viewer__button--delete"
            onClick={handleClose}
          >
            閉じる
          </button>
        </div>
        <iframe className="novel-viewer__iframe" src={src} />
      </Drawer>
    )
  }
}
