import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
  },
}))

export default useStyles
