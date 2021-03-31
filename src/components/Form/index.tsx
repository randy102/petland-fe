import useStyles from './styles'
import clsx from 'clsx'

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

export default function Form(props: Props) {
  const { className, children, ...rest } = props

  const classes = useStyles()

  return (
    <form
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      {children}
    </form>
  )
}
