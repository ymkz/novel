import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { IndexPage } from './pages'
import './styles/index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const App = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <IndexPage />
    </QueryClientProvider>
  </StrictMode>
)

createRoot(document.querySelector('#root') as Element).render(App)
