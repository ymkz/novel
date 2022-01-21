import { ActionFunction, redirect } from "remix"
import { addOne } from "~/utils/narou-kv"

type Body = {
  url: string
}

export const action: ActionFunction = async ({ request }) => {
  const body: Body = await request.json().catch(() => {
    console.error("request body parse error")
    throw new Response("request body parse error", { status: 400 })
  })

  if (!Object.keys(body).includes("url")) {
    console.error("request body 'url' is required")
    throw new Response("request body 'url' is required", { status: 400 })
  }

  const [, ncode, currentPage] = new URL(body.url).pathname.split("/")

  await addOne(DB, { ncode, currentPage: Number(currentPage) || 0 })

  return redirect("/")
}
