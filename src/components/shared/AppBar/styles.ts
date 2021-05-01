import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    display: 'flex',
  },
  logo: {
    height: 48,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    padding: 0,
    gap: theme.spacing(1),
  },
}))

export default useStyles
