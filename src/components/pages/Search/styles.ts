import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: theme.spacing(1.5),
  },
}))

export default useStyles
