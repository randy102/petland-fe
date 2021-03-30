import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  inputRoot: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '40vw'
  },
  search: {
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.main,
    display: 'flex',
    margin: '0 auto',
    padding: theme.spacing(1)
  },
  searchButtonRoot: {
    paddingRight: theme.spacing(1)
  }
}))

export default useStyles
