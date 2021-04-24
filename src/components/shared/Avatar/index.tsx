import useStyles from './styles'
import { useAppSelector } from 'src/redux/hooks'
import Image from '../Image'
import { Icon } from '@material-ui/core'
import clsx from 'clsx'

export type Props = {
  size?: string | number
  className?: string
  src?: string
}

export default function Avatar(props: Props) {
  const { size = 48, className, src } = props

  const user = useAppSelector(state => state.user)

  const classes = useStyles({ size })

  if (src) {
    return <img alt="" className={clsx(classes.avatar, className)} src={src} />
  }

  if (user?.avatar && user.avatar !== 'default') {
    return (
      <Image
        className={clsx(classes.avatar, className)}
        id={user?.avatar || ''}
      />
    )
  }

  return <Icon className={clsx(classes.avatar, className)}>person</Icon>
}
