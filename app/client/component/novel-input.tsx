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
		if (!url) throw new Error('invalid formdata input `url`')
		mutation.mutate(url.toString())
	}

	return (
		<form className="h-10 flex items-center gap-3 bg-gray-100 rounded pl-3" ref={formRef} onSubmit={handleSubmit}>
			<input
				autoComplete="url"
				className="flex-grow outline-0 border-0 font-normal placeholder-gray-400"
				name="url"
				type="url"
				placeholder="https://ncode.syosetu.com"
				required={true}
			/>
			<button className="w-10 h-10 grid place-items-center text-gray-600 cursor-pointer" type="submit">
				<IconSend />
			</button>
		</form>
	)
}
