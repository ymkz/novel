import { StrictMode, useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Header } from './components/header'
import { Item } from './components/item'
import { usePageVisibility } from './hooks/page-visibility'
import './styles/global.css'
import { NovelInfo } from './types'

const App = () => {
  const [novelData, setNovelData] = useState<NovelInfo[]>([])
  const isVisible = usePageVisibility()

  const getAll = async () => {
    try {
      const response = await fetch('/api/get')
      const data: NovelInfo[] = await response.json()
      setNovelData(data)
    } catch (error) {
      console.error(error)
    }
  }

  const addOne = async (url: string) => {
    try {
      const response = await fetch('/api/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      if (response.ok) {
        getAll()
      } else {
        // error handling
      }
    } catch (error) {
      console.error(error)
    }
  }

  const refresh = async () => {
    try {
      const response = await fetch('/api/refresh', { method: 'PATCH' })
      if (response.ok) {
        getAll()
      } else {
        // error handling
      }
    } catch (error) {
      console.error(error)
    }
  }

  const removeOne = async (ncode: NovelInfo['ncode']) => {
    try {
      const response = await fetch('/api/remove', {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ncode }),
      })
      if (response.ok) {
        getAll()
      } else {
        // error handling
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    if (import.meta.env.PROD) {
      refresh()
    }
  }, [isVisible])

  return (
    <>
      <Header addOne={addOne} refresh={refresh} />
      <ul className="list">
        {novelData.map((novelInfo) => (
          <Item
            key={novelInfo.ncode}
            novelInfo={novelInfo}
            removeOne={removeOne}
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
