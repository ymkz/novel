import React, { useState } from 'react'
import { NovelForm } from '~/view/novel-form'
import { useNovels } from '~/view/novel-hook'
import { NovelItem } from '~/view/novel-item'
import { NovelView } from '~/view/novel-view'

export function NovelList() {
  const { novels } = useNovels()
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
    if (confirm('本当に削除しますか')) {
      await fetch('/api/del', {
        method: 'POST',
        body: JSON.stringify({ ncode: target?.ncode }),
      })
      close()
    }
  }

  return (
    <>
      <NovelForm />
      <ul className="list">
        {novels?.map((novel) => (
          <NovelItem key={novel.ncode} novel={novel} open={open} />
        ))}
      </ul>
      <NovelView
        isOpen={isOpen}
        target={target}
        close={close}
        remove={remove}
      />
    </>
  )
}
