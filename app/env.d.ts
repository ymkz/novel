import {} from 'hono'

declare module 'hono' {
  interface Env {
    Bindings: {
      D1: D1Database
    }
  }
}
