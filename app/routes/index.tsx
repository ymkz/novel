import { zValidator } from '@hono/zod-validator'
import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import { z } from 'zod'

import Counter from '~/islands/counter'

const schema = z.object({
  name: z.string().max(10).optional(),
})

const containerStyle = css`
  font-family: sans-serif;
`

export default createRoute(zValidator('query', schema), (ctx) => {
  const { name } = ctx.req.valid('query')
  return ctx.render(
    <div class={containerStyle}>
      <h1>Hello, {name ?? 'john'}!</h1>
      <Counter />
    </div>,
  )
})
