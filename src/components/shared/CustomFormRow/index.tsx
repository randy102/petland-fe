import { FormHelperText } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import useStyles from './styles'

type Props = {
  fullWidth?: boolean
  required?: boolean
  label: string
  children?: React.ReactNode
  className?: string
  helperText?: string
  error?: boolean
}

export default function CustomFormRow(props: Props) {
  const classes = useStyles({ error: props.error })

  return (
    <div
      className={clsx(props.fullWidth && classes.fullWidth, props.className)}
    >
      <div className={classes.root}>
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

      <FormHelperText error={props.error} variant="outlined">
        {props.helperText}
      </FormHelperText>
    </div>
  )
}
