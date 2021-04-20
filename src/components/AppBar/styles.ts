import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    height: 48,
    width: 48
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
