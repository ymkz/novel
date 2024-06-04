type Props = {
	src: string
}

export const ViewContent = ({ src }: Props) => {
	return (
		<div class="view-content">
			<iframe title="iframe" style={{ width: '100%', height: '100%', border: 0 }} src={src} />
		</div>
	)
}
