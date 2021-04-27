import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.grey['400'],
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing(1),
  },
}))

export default useStyles
