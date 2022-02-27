import React from 'react'
import { useForm } from 'react-hook-form'
import { IconSubmit } from '~/view/icon-submit'
import { useNovelAdd } from '~/view/novel-hook'

export function NovelForm() {
  const { addNovel } = useNovelAdd()
  const { register, handleSubmit } = useForm<{ url: string }>()

  const submit = handleSubmit((value) => {
    addNovel(value.url)
  })

  return (
    <div className="header">
      <div className="facade">
        <form className="form" onSubmit={submit}>
          <input
            className="input"
            placeholder="https://ncode.syosetu.com"
            {...register('url')}
          />
          <button className="submit" type="submit">
            <IconSubmit />
          </button>
        </form>
      </div>
    </div>
  )
}
