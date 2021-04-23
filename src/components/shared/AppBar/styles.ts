import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    display: 'flex'
  },
  loginButtonRoot: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: 48,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    padding: 0
  }
}))

export default useStyles