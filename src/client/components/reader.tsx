export const Reader = (ncode: string) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 32,
        padding: 12,
      }}
    >
      <a
        href={`/narou/${ncode}/delete`}
        style={{ fontSize: 14, fontWeight: 'bold', color: '#ef4444' }}
      >
        削除
      </a>
      <a
        href="/"
        style={{ fontSize: 14, fontWeight: 'bold', color: '#6b7280' }}
      >
        戻る
      </a>
    </div>
  )
}
