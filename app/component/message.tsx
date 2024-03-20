type Props = {
  message: string
}

export const Message = ({ message }: Props) => {
  return (
    <div hx-ext="remove-me" class="px:16px">
      <div remove-me="3s">{message}</div>
    </div>
  )
}
