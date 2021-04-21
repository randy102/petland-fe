import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}))

export default useStyles
