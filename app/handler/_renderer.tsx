import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="robots" content="noindex" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, viewport-fit=cover"
          />
          <script src="https://unpkg.com/htmx.org" />
          <script src="https://unpkg.com/htmx.org/dist/ext/remove-me.js" />
          <link rel="stylesheet" href="/static/global.css" />
          <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="manifest" href="/static/manifest.json" crossorigin="use-credentials" />
          <title>Novel</title>
        </head>
        <body>{children}</body>
      </html>
    )
  },
  { docType: true },
)
