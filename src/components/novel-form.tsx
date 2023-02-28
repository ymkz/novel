import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { addNovel } from '../api/novel'
import { IconSubmit } from './icon-submit'

export const NovelForm = () => {
  const [input, setInput] = useState<string>('')

  const queryClient = useQueryClient()

  const novelAddMutation = useMutation({
    mutationFn: addNovel,
    onSuccess: () => {
      setInput('')
      queryClient.invalidateQueries({ queryKey: ['NovelList'] })
    },
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput(event.currentTarget.value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    novelAddMutation.mutate({ url: input })
  }

  return (
    <header className="header">
      <div className="novel-form">
        <form className="novel-form__form" onSubmit={handleSubmit}>
          <input
            className="novel-form__input"
            placeholder="https://ncode.syosetu.com"
            value={input}
            onChange={handleChange}
          />
          <button className="novel-form__submit" type="submit">
            <IconSubmit />
          </button>
        </form>
      </div>
    </header>
  )
}
