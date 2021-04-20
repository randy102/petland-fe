import { makeStyles } from '@material-ui/core'

const avatarSize = 80

const useStyles = makeStyles(theme => ({
  avatarDefault: {
    background: theme.palette.grey['500'],
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontSize: avatarSize,
  },
  avatarImg: {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    height: avatarSize,
    objectFit: 'cover',
    width: avatarSize
  },
  contentHeader: {
    background: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  infoCard: {
    display: 'flex'
  },
  infoContainer: {
    padding: theme.spacing(1)
  },
  linkGrid: {
    display: 'grid',
    gap: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2)
  }
}))

export default useStyles
