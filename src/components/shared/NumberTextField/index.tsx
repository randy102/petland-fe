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
  min?: number
  max?: number
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
          isAllowed={({ floatValue }) => {
            if (props.max === undefined) {
              return true
            }

            return floatValue === undefined || floatValue <= props.max
          }}
          label={props.label}
          max={props.max}
          min={props.min}
          required={props.required}
          suffix={props.suffix}
          thousandSeparator={props.thousandSeparator}
          variant="outlined"
        />
      )}
    />
  )
}
