import dayjs from "dayjs"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Sheet from "react-modal-sheet"
import { LoaderFunction, useLoaderData } from "remix"
import { fetchNarouApiResult } from "~/utils/narou-api"
import { getAll } from "~/utils/narou-kv"

export const loader: LoaderFunction = async ({ request }) => {
  const current = await getAll(DB)
  const ncodes = current.map((novel) => novel.ncode).join("-")
  const results = await fetchNarouApiResult(ncodes, request)
  const novels = results.map<NovelForView>((result) => ({
    ...result,
    currentPage:
      current.find((currentItem) => currentItem.ncode === result.ncode)
        ?.currentPage ?? 0,
    lastPublishedAt: dayjs
      .unix(result.lastPublishedAt)
      .format("YYYY年M月D日H時m分"),
  }))
  return novels
}

export default function Index() {
  const novels: NovelForView[] = useLoaderData()
  const { register, handleSubmit, resetField } = useForm<{ url: string }>()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<NovelForView | null>(null)

  const add = async () => {
    await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ url: "https://example.com" }),
    })
  }

  const del = async () => {
    if (confirm("本当に削除しますか")) {
      await fetch("/api/del", {
        method: "POST",
        body: JSON.stringify({ ncode: target?.ncode }),
      })
      close()
    }
  }

  const open = (novel: NovelForView) => {
    setOpen(true)
    setTarget(novel)
  }

  const close = () => {
    setOpen(false)
    setTarget(null)
  }

  const closeEnd = () => {
    location.reload()
  }

  const submit = handleSubmit(async ({ url }) => {
    await fetch("/api/add", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
    resetField("url")
    location.reload()
  })

  return (
    <div id="root">
      <div className="header">
        <div className="facade">
          <form className="form" onSubmit={submit}>
            <input
              className="input"
              placeholder="https://ncode.syosetu.com"
              {...register("url")}
            />
            <button className="submit">
              <svg width="18" height="18" viewBox="0 0 256 256">
                <path
                  d="M219.536 121.02L50.62 26.428a8 8 0 0 0-11.443 9.67l31.861 89.211a8 8 0 0 1 0 5.382L39.178 219.9a8 8 0 0 0 11.443 9.671l168.915-94.592a8 8 0 0 0 0-13.96z"
                  opacity=".2"
                  fill="currentColor"
                ></path>
                <path
                  d="M223.444 114.04L54.53 19.446A16 16 0 0 0 31.644 38.79L63.504 128l-31.86 89.21a16.04 16.04 0 0 0 15.04 21.41a16.039 16.039 0 0 0 7.846-2.067l168.913-94.592a16.002 16.002 0 0 0 .001-27.922zM46.714 222.583L77.639 136H136a8 8 0 0 0 0-16H77.638L46.72 33.412L215.626 128z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <ul className="list">
        {novels.map((novel) => (
          <li key={novel.ncode} onClick={() => open(novel)} className="item">
            <div className="title">{novel.title}</div>
            <div className="page">
              {novel.currentPage}話／全{novel.totalPage}話
            </div>
            <div className="date">{novel.lastPublishedAt}</div>
          </li>
        ))}
      </ul>
      <Sheet isOpen={isOpen} onClose={close} onCloseEnd={closeEnd}>
        <Sheet.Container>
          <Sheet.Header>
            <div className="sheet-header">
              <div onClick={del} className="delete">
                削除
              </div>
              <div onClick={close} className="close">
                閉じる
              </div>
            </div>
          </Sheet.Header>
          <Sheet.Content>
            <iframe
              src={`/narou/${target?.ncode}/${target?.currentPage || ""}`}
              className="sheet-content"
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </div>
  )
}
