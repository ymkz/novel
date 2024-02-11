import {} from 'hono'

declare module 'hono' {
  interface Env {
    Bindings: {
      D1: D1Database
    }
  }
  interface ContextRenderer {
    (content: string | Promise<string>): Response | Promise<Response>
  }
}
