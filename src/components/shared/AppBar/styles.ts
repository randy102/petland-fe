import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  avatarContainer: {
    display: 'flex',
  },
  logo: {
    height: 58,
  },
  logoLink: {
    display: 'flex',
  },
  toolbar: {
    padding: 0,
    justifyContent: 'space-between',
    gap: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      gap: theme.spacing(2),
    },
  },
}))

export default useStyles
