type Props = {
  src: string
}

export const ViewerContent = ({ src }: Props) => {
  return (
    <div class="flex-grow:1">
      <iframe title="iframe" style={{ width: '100%', height: '100%', border: 0 }} src={src} />
    </div>
  )
}
