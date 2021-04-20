import { makeStyles } from '@material-ui/core'

const avatarSize = 100

const useStyles = makeStyles(theme => ({
  avatarButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translate(50%, -50%)'
  },
  avatarContainer: {
    margin: '0 auto',
    position: 'relative'
  },
  avatarDefault: {
    background: theme.palette.grey['500'],
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontSize: avatarSize
  },
  avatarImg: {
    borderRadius: theme.shape.borderRadius,
    height: avatarSize,
    objectFit: 'cover',
    width: avatarSize
  }
}))

export default useStyles
