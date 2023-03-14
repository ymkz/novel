import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addNovel } from '../api/novel'
import {
  Box,
  FilledInput,
  IconButton,
  InputAdornment,
  SendRoundedIcon,
} from './mui-material'

export const NovelForm = () => {
  const queryClient = useQueryClient()

  const novelAddMutation = useMutation({
    mutationFn: addNovel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['NovelList'] })
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

  return (
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
  )
}
