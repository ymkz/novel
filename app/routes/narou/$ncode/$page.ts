import { LoaderFunction } from "remix"
import invariant from "tiny-invariant"
import { updateOne } from "~/utils/narou-kv"

const rewriter = new HTMLRewriter().on("a", {
  element(element) {
    const attribute = element.getAttribute("href")
    if (attribute) {
      if (attribute.match(/^\/n.+/)) {
        const [, ncode, page] = attribute.split("/")
        element.setAttribute(
          "href",
          attribute.replace(/^\/n.+/, `/narou/${ncode}/${page}`)
        )
      }
    }
  },
})

export const loader: LoaderFunction = async ({ request, params }) => {
  invariant(params.ncode, "Expected params.ncode")
  invariant(params.page, "Expected params.page")

  await updateOne(DB, {
    ncode: params.ncode,
    currentPage: Number(params.page) || 0,
  })

  const userAgent = request.headers.get("user-agent") ?? ""
  const url = `https://ncode.syosetu.com/${params.ncode}/${params.page || ""}`
  const proxied = await fetch(url, { headers: { "user-agent": userAgent } })

  return rewriter.transform(proxied)
}
