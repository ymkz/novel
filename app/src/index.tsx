import { StrictMode } from "react"
import { render } from "react-dom"
import { Body } from "./components/body"
import { Header } from "./components/header"
import "./styles/reset.css"

const App = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  )
}

const Root = () => {
  return (
    <StrictMode>
      <App />
      {/* {location.hostname.includes("pages.dev") ? null : <App />} */}
    </StrictMode>
  )
}

render(<Root />, document.querySelector("#root"))
