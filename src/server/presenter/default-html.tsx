import { renderToString } from 'react-dom/server'
import { factory } from '../factory'

export const defaultHtmlHandlers = factory.createHandlers((ctx) => {
	return ctx.html(
		renderToString(
			<html lang="ja">
				<head>
					<meta charSet="utf-8" />
					<meta name="robots" content="noindex" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
					{import.meta.env.PROD ? (
						<script type="module" src="/static/client/index.js" />
					) : (
						<script type="module" src="/src/client/index.tsx" />
					)}
					<link rel="stylesheet" href="/static/global.css" />
					<link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
					<link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
					<link rel="manifest" href="/static/manifest.json" crossOrigin="use-credentials" />
					<title>NarouReader</title>
				</head>
				<body>
					<div id="root" />
				</body>
			</html>,
		),
	)
})
