import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { addNovel } from '../api/novel'
import { IconSend } from './icon-send'

export const NovelInput = () => {
	const formRef = useRef<HTMLFormElement>(null)
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: addNovel,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['novels'] })
			formRef.current?.reset()
		},
	})

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()
		const url = new FormData(event.currentTarget).get('url')
		if (!url) throw new Error('invalid formData input `url`')
		mutation.mutate(url.toString())
	}

	return (
		<form className="add-form" ref={formRef} onSubmit={handleSubmit}>
			<input
				autoComplete="url"
				className="add-form-input"
				name="url"
				type="url"
				placeholder="https://ncode.syosetu.com"
				required={true}
			/>
			<button className="add-form-button" type="submit">
				<IconSend />
			</button>
		</form>
	)
}
