import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: '#fff',
    zIndex: theme.zIndex.drawer + 1,
  },
}))

export default useStyles
