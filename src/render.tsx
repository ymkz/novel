import React from 'react'
import ReactDOM from 'react-dom'
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

ReactDOM.render(<App />, document.querySelector('#root'))
