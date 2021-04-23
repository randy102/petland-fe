import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  card: {
    padding: theme.spacing(2),
  },
  avatar: {
    margin: 4,
  },
  infoCard: {
    display: 'flex',
  },
  infoContainer: {
    padding: theme.spacing(1),
  },
  linkGrid: {
    display: 'grid',
    gap: theme.spacing(1),
  },
}))

export default useStyles
