import { StrictMode, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Header } from './components/header'
import { Item } from './components/item'
import './styles/global.css'
import { NovelInfo } from './types'

const App = () => {
  const [novelData, setNovelData] = useState<NovelInfo[]>([])

  const requestGet = async () => {
    try {
      const response = await fetch('/api/get')
      const data: NovelInfo[] = await response.json()
      setNovelData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const requestAdd = async (url: string) => {
    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (response.ok) {
        requestGet()
      } else {
        // error handling
      }
    } catch (error) {
      console.error(error)
    }
  }

  const requestDelete = async (ncode: NovelInfo['ncode']) => {
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ncode }),
      })
      if (response.ok) {
        requestGet()
      } else {
        // error handling
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    requestGet()
  }, [])

  return (
    <>
      <Header requestAdd={requestAdd} />
      <ul className="list">
        {novelData.map((novelInfo) => (
          <Item
            key={novelInfo.ncode}
            novelInfo={novelInfo}
            requestDelete={requestDelete}
          />
        ))}
      </ul>
    </>
  )
}

render(
  <StrictMode>
    {location.hostname.includes('pages.dev') ? null : <App />}
  </StrictMode>,
  document.querySelector('#root')
)
