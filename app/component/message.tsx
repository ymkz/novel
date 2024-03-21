type Props = {
  message: string
}

export const Message = ({ message }: Props) => {
  return (
    <div hx-ext="remove-me" class="message">
      <div remove-me="4s">{message}</div>
    </div>
  )
}
