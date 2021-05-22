import { animated, useSpring } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"
import "./style.css"

export const Item = () => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }))

  const bind = useDrag(
    ({ down, movement: [mx], ...rest }) => {
      console.log(rest)
      return api.start({ x: down ? mx : 0 })
    },
    { axis: "x", threshold: 10 }
  )

  return (
    <li className="item-container">
      <animated.div className="item-facade" {...bind()} style={{ x }}>
        item
      </animated.div>
    </li>
  )
}
