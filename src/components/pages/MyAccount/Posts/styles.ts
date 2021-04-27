import { makeStyles } from '@material-ui/core'

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
      marginTop: theme.spacing(2),
    },
  },
}))

export default useStyles
