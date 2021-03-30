import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
    display: 'flex',
    flexDirection: 'column',
  }
}))

export default useStyles
