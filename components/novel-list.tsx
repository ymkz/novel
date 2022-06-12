import { useState } from 'react'
import { useNovels } from '../hooks/novel-hooks'
import { NovelInput } from './novel-input'
import { NovelItem } from './novel-item'
import { NovelReader } from './novel-reader'

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
