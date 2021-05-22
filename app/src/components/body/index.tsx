import { Item } from "../item"
import "./style.css"

const items = [...Array(15)].map((v, k) => k)

export const Body = () => {
  return (
    <main className="body">
      <ul className="list">
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </main>
  )
}
