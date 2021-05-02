import { makeStyles, Theme } from '@material-ui/core'
import { Props } from './index'

const useStyles = makeStyles<Theme, Props>(theme => ({
  avatar: props => ({
    borderRadius: theme.shape.borderRadius,
    height: props.size,
    width: props.size,
    objectFit: 'cover',
  }),
  default: props => ({
    background: theme.palette.grey['300'],
    color: theme.palette.grey['500'],
    fontSize: props.size,
  }),
}))

export default useStyles
