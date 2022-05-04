import React from 'react'
import { createRoot } from 'react-dom/client'
import { SWRConfig } from 'swr'
import { NovelList } from '~/view/novel-list'

function App() {
  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        fetcher: (req) => fetch(req).then((res) => res.json()),
      }}
    >
      <NovelList />
    </SWRConfig>
  )
}

createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
