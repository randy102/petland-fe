import { makeStyles } from '@material-ui/core'

const avatarSize = 48

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    height: avatarSize,
    width: avatarSize
  },
  avatarDefault: {
    alignItems: 'center',
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.black,
    fontSize: avatarSize,
  },
  avatarImg: {
    borderRadius: theme.shape.borderRadius,
    height: avatarSize,
    objectFit: 'cover',
    width: avatarSize
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
