import { makeStyles, Theme } from '@material-ui/core'
import { Props } from './index'

const useStyles = makeStyles<Theme, Props>(theme => {
  return ({
    avatarDefault: (props) => ({
      borderRadius: props.borderRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      borderBottomRightRadius: props.borderBottomRightRadius,
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderTopRightRadius: props.borderTopRightRadius,
      fontSize: props.size,
      background: props.background,
      color: props.color,
    }),
    avatarImg: props => ({
      borderRadius: props.borderRadius,
      borderBottomLeftRadius: props.borderBottomLeftRadius,
      borderBottomRightRadius: props.borderBottomRightRadius,
      borderTopLeftRadius: props.borderTopLeftRadius,
      borderTopRightRadius: props.borderTopRightRadius,
      height: props.size,
      width: props.size,
      objectFit: 'cover',
    })
  })
})

export default useStyles
