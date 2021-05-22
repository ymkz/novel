import { StrictMode } from "react"
import { render } from "react-dom"
import { Item } from "./components/item"
import "./styles/list.css"
import "./styles/reset.css"

const App = () => {
  return (
    <>
      <header className="header">Header</header>
      <main className="body">
        <ul className="list">
          <Item />
          <Item />
        </ul>
      </main>
    </>
  )
}

const Root = () => {
  return (
    <StrictMode>
      {location.hostname.includes("pages.dev") ? null : <App />}
    </StrictMode>
  )
}

render(<Root />, document.querySelector("#root"))
