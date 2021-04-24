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
      as={
        <NumberFormat
          allowLeadingZeros={props.allowLeadingZeros}
          allowNegative={props.allowNegative}
          customInput={TextField}
          decimalScale={props.decimalScale}
          decimalSeparator={props.decimalSeparator}
          isAllowed={({ floatValue }) => {
            if (props.max === undefined) {
              return true
            }

            return floatValue === undefined || floatValue <= props.max
          }}
          max={props.max}
          min={props.min}
          suffix={props.suffix}
          thousandSeparator={props.thousandSeparator}
        />
      }
      control={props.control}
      defaultValue={props.defaultValue}
      fullWidth={props.fullWidth}
      helperText={props.helperText}
      label={props.label}
      name={props.name}
      required={props.required}
      variant="outlined"
    />
  )
}
