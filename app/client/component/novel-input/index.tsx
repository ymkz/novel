import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'
import { addNovel } from '../../api/novel'
import { IconSend } from '../icon/send'

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
		mutation.mutate(url.toString(), {
			onSuccess: () => {
				toast.success('Novel added')
			},
		})
	}

	return (
		<form className="input-container" ref={formRef} onSubmit={handleSubmit}>
			<input
				autoComplete="url"
				className="input-text"
				name="url"
				type="url"
				placeholder="https://ncode.syosetu.com"
				required={true}
			/>
			<button className="input-submit" type="submit">
				<IconSend />
			</button>
		</form>
	)
}
