import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Drawer } from 'vaul'
import { NovelInput } from './component/novel-input'
import { NovelList } from './component/novel-list'
import { NovelViewer } from './component/novel-viewer'
import { useNovelStore } from './store/novel'

const queryClient = new QueryClient()

export function App() {
	const closeNovelViewer = useNovelStore((state) => state.closeNovelViewer)

	return (
		<QueryClientProvider client={queryClient}>
			<Drawer.Root onClose={closeNovelViewer}>
				<NovelInput />
				<NovelList />
				<NovelViewer />
			</Drawer.Root>
		</QueryClientProvider>
	)
}
