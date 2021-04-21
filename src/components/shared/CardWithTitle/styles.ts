import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2)
  },
  header: {
    background: theme.palette.primary.main,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    margin: theme.spacing(-2),
    marginBottom: theme.spacing(2)
  },
  title: {
    color: theme.palette.primary.contrastText
  }
}))

export default useStyles
