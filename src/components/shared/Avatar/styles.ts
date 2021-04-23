import { makeStyles, Theme } from '@material-ui/core'
import { Props } from './index'

const useStyles = makeStyles<Theme, Props>(theme => {
  return {
    avatar: props => ({
      borderRadius: theme.shape.borderRadius,
      height: props.size,
      width: props.size,
      fontSize: props.size,
      objectFit: 'cover',
      background: theme.palette.common.black,
      color: theme.palette.common.white,
    }),
  }
})

export default useStyles
