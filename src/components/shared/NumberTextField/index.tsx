import { TextField } from '@material-ui/core'
import { Control, Controller } from 'react-hook-form'
import NumberFormat from 'react-number-format'

type Props = {
  fullWidth?: boolean
  required?: boolean
  allowLeadingZeros?: boolean
  allowNegative?: boolean
  decimalScale?: number
  decimalSeparator?: string
  thousandSeparator?: string | boolean
  prefix?: string
  suffix?: string
  control: Control<any>
  defaultValue?: string | number
  helperText?: string
  label: string
  name: string
}

export default function NumberTextField(props: Props) {
  return (
    <Controller
      control={props.control}
      defaultValue={props.defaultValue}
      name={props.name}
      render={({ field, fieldState }) => (
        <NumberFormat
          allowLeadingZeros={props.allowLeadingZeros}
          allowNegative={props.allowNegative}
          customInput={TextField}
          decimalScale={props.decimalScale}
          decimalSeparator={props.decimalSeparator}
          fullWidth={props.fullWidth}
          helperText={props.helperText}
          label={props.label}
          required={props.required}
          suffix={props.suffix}
          thousandSeparator={props.thousandSeparator}
          value={field.value}
          variant="outlined"
          onBlur={field.onBlur}
          onValueChange={values => {
            field.onChange(values.floatValue)
          }}
        />
      )}
    />
  )
}
