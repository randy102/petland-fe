import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  inputRoot: {
    flexGrow: 1,
  },
  search: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.main,
    display: 'flex',
    flexGrow: 1,
    gap: theme.spacing(1),
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
}))

export default useStyles
