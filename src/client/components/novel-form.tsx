import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { addNovel } from '../api/novel'
import {
  Alert,
  Box,
  FilledInput,
  IconButton,
  InputAdornment,
  SendRoundedIcon,
  Snackbar,
} from './mui-material'

export const NovelForm = () => {
  const [error, setError] = useState<Error | null>(null)

  const queryClient = useQueryClient()

  const novelAddMutation = useMutation({
    mutationFn: addNovel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['NovelList'] })
    },
    onError: (err) => {
      setError(err as Error)
    },
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget).get('url')
    if (data) {
      novelAddMutation.mutate({ url: data.toString() })
      event.currentTarget.reset()
    }
  }

  const handleClose = () => {
    setError(null)
  }

  return (
    <>
      <Box component="form" paddingX={2} paddingTop={1} onSubmit={handleSubmit}>
        <FilledInput
          size="small"
          name="url"
          placeholder="https://ncode.syosetu.com"
          hiddenLabel
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                size="small"
                type="submit"
                sx={{ padding: 0 }}
              >
                <SendRoundedIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <Snackbar
        open={Boolean(error)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          elevation={6}
        >
          {error?.message}
        </Alert>
      </Snackbar>
    </>
  )
}
