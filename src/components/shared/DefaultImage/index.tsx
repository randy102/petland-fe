import clsx from 'clsx'
import useStyles from './styles'

type Props = {
  className?: string
  fontSize?: string | number
}

export default function DefaultImage(props: Props) {
  const { className, fontSize } = props

  const classes = useStyles({ fontSize })

  return (
    <div className={clsx(classes.root, className)}>
      <i className="fas fa-paw" />
    </div>
  )
}
