import { ActionFunction, redirect } from "remix"
import { addOne } from "~/utils/narou-kv"

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData().catch(() => {
    console.error("request formData can not parse")
    throw new Response("request formData can not parse", { status: 400 })
  })

  const url = formData.get("url")?.toString()

  if (!url) {
    console.error("request body 'url' is required")
    throw new Response("request body 'url' is required", { status: 400 })
  }

  const [, ncode, currentPage] = new URL(url).pathname.split("/")

  await addOne(DB, { ncode, currentPage: Number(currentPage) || 0 })

  return redirect("/")
}
