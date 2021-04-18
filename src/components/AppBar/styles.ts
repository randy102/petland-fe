import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    height: 48,
    width: 48
  },
  avatarDefault: {
    alignItems: 'center',
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.black,
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    width: 48
  },
  avatarImg: {
    borderColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 48,
    objectFit: 'cover',
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
  }
}))

export default useStyles
