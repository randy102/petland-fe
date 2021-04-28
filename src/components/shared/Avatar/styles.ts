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
    background: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: props.size,
  }),
}))

export default useStyles
