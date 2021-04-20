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
    display: 'flex',
    height: avatarSize,
    justifyContent: 'center',
    width: avatarSize
  },
  avatarImg: {
    borderColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
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
  }
}))

export default useStyles
