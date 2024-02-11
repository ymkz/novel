import { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (ctx) => {
  return ctx.render(<h1>Not Found</h1>)
}

export default handler
