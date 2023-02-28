import { proxy } from 'valtio'
import { NarouItem } from '../models/narou'

type NovelViewerState =
  | {
      open: false
      novel: null
    }
  | {
      open: true
      novel: NarouItem
    }

export const novelViewerState = proxy<NovelViewerState>({
  open: false,
  novel: null,
})

export const openNovelViewer = (novel: NarouItem) => {
  novelViewerState.open = true
  novelViewerState.novel = novel
}

export const closeNovelViewer = () => {
  novelViewerState.open = false
  novelViewerState.novel = null
}
