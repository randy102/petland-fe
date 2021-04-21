import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  contentHeader: {
    background: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  avatar: {
    margin: 4
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
