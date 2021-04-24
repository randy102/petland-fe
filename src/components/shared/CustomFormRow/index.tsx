import clsx from 'clsx'
import useStyles from './styles'

type Props = {
  fullWidth?: boolean
  required?: boolean
  label: string
  children?: React.ReactNode
  className?: string
}

export default function CustomFormRow(props: Props) {
  const classes = useStyles()

  return (
    <div
      className={clsx(
        classes.root,
        props.fullWidth && classes.fullWidth,
        props.className
      )}
    >
      <div className={classes.label}>
        {props.label}
        {props.required && (
          <span
            aria-hidden="true"
            className="MuiFormLabel-asterisk MuiInputLabel-asterisk"
          >
            {' *'}
          </span>
        )}
      </div>

      {props.children}
    </div>
  )
}
