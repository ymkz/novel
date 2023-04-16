import { FC } from 'react'
import { novelViewerToOpen } from '../utils/store'
import { generateNcodeCaption, generatePageInfo } from '../utils/stringify'
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from './mui-material'

type NovelItemProps = {
  novel: Novel
}

export const NovelItem: FC<NovelItemProps> = ({ novel }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => novelViewerToOpen(novel)}>
        <ListItemText
          primary={novel.title}
          primaryTypographyProps={{
            fontWeight: 700,
            lineHeight: 1.2,
            gutterBottom: true,
          }}
          secondary={
            <>
              <Typography variant="caption" display="block" lineHeight={1.2}>
                {generatePageInfo(novel)}
              </Typography>
              <Typography variant="caption" display="block" lineHeight={1.2}>
                {novel.lastPublishedAt}
              </Typography>
              <Typography variant="caption" display="block" lineHeight={1.2}>
                {generateNcodeCaption(novel)}
              </Typography>
            </>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}
