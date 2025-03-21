import { createRoot } from 'react-dom/client'
import { App } from './client/app'

const container = document.querySelector('#root')
if (!container) throw new Error('no container element found')
const root = createRoot(container)
root.render(<App />)
