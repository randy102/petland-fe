import { makeStyles } from '@material-ui/core'

const thumbnailSize = 120

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(-2),
    marginLeft: theme.spacing(-2),
    marginRight: theme.spacing(-2),
    marginBottom: theme.spacing(2),
  },
  posts: {
    display: 'flex',
    flexDirection: 'column',
    '& > div:not(:first-child)': {
      marginTop: theme.spacing(3),
    },
  },
  post: {
    display: 'flex',
    '& > img': {
      height: '100%',
      width: thumbnailSize,
    },
    '& > div': {
      padding: theme.spacing(2),
    },
  },
  loading: {
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default useStyles
