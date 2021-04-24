import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: theme.spacing(3),
  },
  formGrid: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(3),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
}))

export default useStyles
