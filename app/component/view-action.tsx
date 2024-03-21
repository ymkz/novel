type Props = {
  ncode: string
}

export const ViewAction = ({ ncode }: Props) => {
  return (
    <div class="view-action">
      <form hx-post={`/${ncode}`} hx-trigger="click">
        <span class="view-action--remove">削除</span>
      </form>
      <a href="/" class="view-action--close">
        閉じる
      </a>
    </div>
  )
}
