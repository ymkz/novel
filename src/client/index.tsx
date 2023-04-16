import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Container, CssBaseline } from './components/mui-material'
import { NovelForm } from './components/novel-form'
import { NovelList } from './components/novel-list'
import { NovelViewer } from './components/novel-viewer'

const queryClient = new QueryClient()

const App = () => {
  return (
    <StrictMode>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <Container disableGutters maxWidth="md">
            <NovelForm />
            <NovelList />
            <NovelViewer />
          </Container>
        </QueryClientProvider>
      </SnackbarProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root') as HTMLElement).render(<App />)
