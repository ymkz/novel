import { Links, LinksFunction, Meta, Outlet, Scripts } from "remix"
import appleTouchIcon from "~/assets/apple-touch-icon.png"
import favicon from "~/assets/favicon.svg"
import globalStyle from "~/styles/global.css"

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyle },
    { rel: "icon", href: favicon, type: "image/svg+xml" },
    { rel: "apple-touch-icon", href: appleTouchIcon, sizes: "180x180" },
    {
      rel: "manifest",
      href: "/site.webmanifest",
      crossOrigin: "use-credentials",
    },
  ]
}

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=0"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Narou" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#000000" />
        <Meta />
        <Links />
        <title>Narou</title>
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
