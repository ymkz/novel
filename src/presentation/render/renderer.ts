import { html } from "hono/html";
import { jsxRenderer } from "hono/jsx-renderer";

export const renderer = jsxRenderer(({ children }) => {
  return html`<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="robots" content="noindex" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/static/apple-touch-icon.png"
        />
        <link
          rel="manifest"
          href="/static/manifest.json"
          crossorigin="use-credentials"
        />
        <link href="/static/style.css" rel="stylesheet" />
        <title>Novel</title>
        <script src="https://unpkg.com/htmx.org@1.9.6"></script>
      </head>
      <body>
        ${children}
      </body>
    </html>`;
});
