import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    '& h2': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  titleIcon: {
    color: theme.palette.warning.main,
    marginRight: theme.spacing(1),
  },
}))

export default useStyles
