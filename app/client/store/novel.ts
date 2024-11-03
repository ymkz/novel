import { create } from 'zustand'
import type { NarouNovel } from '../../server/domain/narou/model'

type State = {
	novel: NarouNovel | null
	openNovelViewer: (novel: NarouNovel) => void
	closeNovelViewer: () => void
}

export const useNovelStore = create<State>((set) => ({
	novel: null,
	openNovelViewer: (novel: NarouNovel) => set({ novel }),
	closeNovelViewer: () => set({ novel: null }),
}))
