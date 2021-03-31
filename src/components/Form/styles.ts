import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default useStyles
