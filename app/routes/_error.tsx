import { ErrorHandler } from 'hono'

const handler: ErrorHandler = (err, ctx) => {
  return ctx.render(<h1>Error! {err.message}</h1>)
}

export default handler
