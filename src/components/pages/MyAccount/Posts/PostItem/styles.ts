import { makeStyles } from '@material-ui/core'

const thumbnailSize = 150

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
  },
  thumbnail: {
    height: thumbnailSize,
    width: thumbnailSize,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 500,
  },
}))

export default useStyles
