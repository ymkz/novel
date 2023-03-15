import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSnapshot } from 'valtio/react'
import { deleteNovel } from '../api/novel'
import { novelViewerState, novelViewerToClose } from '../helpers/client-state'
import { generateIframeSrc } from '../helpers/client-stringify'
import { Box, Button, Drawer } from './mui-material'

export const NovelViewer = () => {
  const novelViewer = useSnapshot(novelViewerState)

  const queryClient = useQueryClient()

  const novelDeleteMutation = useMutation({
    mutationFn: deleteNovel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['NovelList'] })
      novelViewerToClose()
    },
  })

  const handleDelete = () => {
    if (novelViewer.open) {
      novelDeleteMutation.mutate({ ncode: novelViewer.novel.ncode })
    }
  }

  return (
    <Drawer
      anchor="bottom"
      open={novelViewer.open}
      onClose={novelViewerToClose}
    >
      {novelViewer.open ? (
        <Box height="94vh" display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            <Button
              size="small"
              color="error"
              onClick={handleDelete}
              sx={{ minWidth: 'inherit', paddingLeft: 1 }}
            >
              削除
            </Button>
            <Button
              size="small"
              onClick={novelViewerToClose}
              sx={{ minWidth: 'inherit', paddingRight: 1 }}
            >
              閉じる
            </Button>
          </Box>
          <Box flex={1} overflow="hidden">
            <iframe
              style={{ width: '100%', height: '100%', border: 0 }}
              src={generateIframeSrc(novelViewer.novel)}
            />
          </Box>
        </Box>
      ) : null}
    </Drawer>
  )
}
