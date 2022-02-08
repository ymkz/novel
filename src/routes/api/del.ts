import { ActionFunction, redirect } from "remix"
import { removeOne } from "~/utils/narou-kv"

type Body = {
  ncode: string
}

export const action: ActionFunction = async ({ request }) => {
  const body: Body = await request.json().catch(() => {
    console.error("request body parse error")
    throw new Response("request body parse error", { status: 400 })
  })

  if (!Object.keys(body).includes("ncode")) {
    console.error("request body 'ncode' is required")
    throw new Response("request body 'ncode' is required", { status: 400 })
  }

  await removeOne(DB, body.ncode)

  return redirect("/")
}
