type Props = {
  ncode: string
}

export const ViewerHeader = ({ ncode }: Props) => {
  return (
    <div class="height:32px px:8px flex justify-content:space-between align-items:center">
      <form hx-delete="/api/narou" hx-trigger="click">
        <span class="font-family:sans font-weight:400 font-size:11px color:red-50">削除</span>
        <input name="ncode" type="hidden" value={ncode} />
      </form>
      <a href="/" class="font-family:sans font-weight:400 font-size:11px color:fade-20">
        閉じる
      </a>
    </div>
  )
}
