import { IconSend } from "./icon-send";

export const NovelForm = () => {
	return (
		<form class="form" hx-post="/api/narou/add" hx-target=".main">
			<input
				autoComplete="url"
				class="input"
				name="url"
				placeholder="https://ncode.syosetu.com"
				required
				type="url"
			/>
			<button class="icon-button" type="submit">
				<IconSend class="icon-send" />
			</button>
		</form>
	);
};
