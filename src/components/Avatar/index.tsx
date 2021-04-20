import useStyles from './styles'
import theme from 'src/theme'
import { useAppSelector } from 'src/redux/hooks'
import Image from '../Image'
import { Icon } from '@material-ui/core'


export type Props = {
  size?: string | number
  borderRadius?: string | number
  borderBottomLeftRadius?: string | number
  borderBottomRightRadius?: string | number
  borderTopLeftRadius?: string | number
  borderTopRightRadius?: string | number
  background?: string
  color?: string
  src?: string
}

export default function Avatar(props: Props) {
  const user = useAppSelector(state => state.user)

  const classes = useStyles({
    size: 48,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    ...props,
  })

  if (props.src) {
    return (
      <img
        className={classes.avatarImg}
        src={props.src}
      />
    )
  }

  if (user?.avatar && !props.src) {
    return (
      <Image
        className={classes.avatarImg}
        id={user.avatar}
      />
    )
  }

  return (
    <Icon className={classes.avatarDefault}>person</Icon>
  )
}
