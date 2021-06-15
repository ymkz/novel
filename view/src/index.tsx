import { StrictMode } from 'react'
import { render } from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { IndexPage } from './pages/index'
import './styles/global.css'

const queryClient = new QueryClient()

render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {location.hostname.includes('pages.dev') ? null : <IndexPage />}
    </QueryClientProvider>
  </StrictMode>,
  document.querySelector('#root')
)
