import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children }) => {
    return (
      <html lang="ja">
        <head>
          <meta charset="utf-8" />
          <meta name="robots" content="noindex" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.master.co/css" />
          <script src="https://unpkg.com/htmx.org@1.9.10" />
          <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="manifest" href="/static/manifest.json" crossorigin="use-credentials" />
          <link href="https://cdn.master.co/normal.css" rel="stylesheet" />
          <title>Novel</title>
        </head>
        <body class="bg:fade-98">{children}</body>
      </html>
    )
  },
  { docType: true },
)
