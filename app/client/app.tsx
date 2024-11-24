import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { Route, Switch } from 'wouter'
import { NovelList } from './component/novel-list'
import { NovelViewer } from './component/novel-viewer'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
})

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Toaster />
			<Switch>
				<Route path="/" component={NovelList} />
				<Route path="/narou/:ncode/:page?" component={NovelViewer} />
			</Switch>
		</QueryClientProvider>
	)
}
