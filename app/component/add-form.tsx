import { IconSend } from '~/component/icon-send'

export const AddForm = () => {
	return (
		<form class="add-form" hx-post="/" hx-target="#root">
			<input
				autoComplete="url"
				class="add-form-input"
				name="url"
				type="url"
				placeholder="https://ncode.syosetu.com"
				required
			/>
			<button class="add-form-button" type="submit">
				<IconSend />
			</button>
		</form>
	)
}
