import { useState } from 'react'
import { useGetNovelsQuery, useRefetchNovelMutation } from '../hooks/novel'
import { NovelInput } from './novel-input'
import { NovelItem } from './novel-item'
import { NovelReader } from './novel-reader'

export const NovelList = () => {
  const { novels } = useGetNovelsQuery()
  const { refetchNovel } = useRefetchNovelMutation()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<NarouItem | null>(null)

  const open = (novel: NarouItem) => {
    setOpen(true)
    setTarget(novel)
  }

  const close = () => {
    refetchNovel()
    setOpen(false)
    setTarget(null)
  }

  return (
    <>
      <NovelInput />
      <ul className="list">
        {novels?.map((novel) => (
          <NovelItem key={novel.ncode} novel={novel} open={open} />
        ))}
      </ul>
      <NovelReader isOpen={isOpen} target={target} close={close} />
    </>
  )
}
