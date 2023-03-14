import { proxy } from 'valtio'

type NovelViewerState =
  | {
      open: false
      novel: null
    }
  | {
      open: true
      novel: Novel
    }

export const novelViewerState = proxy<NovelViewerState>({
  open: false,
  novel: null,
})

export const novelViewerToOpen = (novel: Novel) => {
  novelViewerState.open = true
  novelViewerState.novel = novel
}

export const novelViewerToClose = () => {
  novelViewerState.open = false
  novelViewerState.novel = null
}
