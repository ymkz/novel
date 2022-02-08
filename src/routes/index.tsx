import dayjs from "dayjs"
import { useState } from "react"
import { LoaderFunction, useLoaderData } from "remix"
import { NovelForm } from "~/components/novel-form"
import { NovelItem } from "~/components/novel-item"
import { NovelViewer } from "~/components/novel-viewer"
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
  const [isOpen, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<NovelForView | null>(null)

  const open = (novel: NovelForView) => {
    setOpen(true)
    setTarget(novel)
  }

  const close = () => {
    setOpen(false)
    setTarget(null)
  }

  const remove = async () => {
    if (confirm("本当に削除しますか")) {
      await fetch("/api/del", {
        method: "POST",
        body: JSON.stringify({ ncode: target?.ncode }),
      })
      close()
    }
  }

  return (
    <div id="root">
      <NovelForm />
      <ul className="list">
        {novels.map((novel) => (
          <NovelItem key={novel.ncode} novel={novel} open={open} />
        ))}
      </ul>
      <NovelViewer
        isOpen={isOpen}
        target={target}
        close={close}
        remove={remove}
      />
    </div>
  )
}
