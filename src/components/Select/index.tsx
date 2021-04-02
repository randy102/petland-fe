import { FormControl, FormHelperText, InputLabel, Select as MuiSelect } from '@material-ui/core'
import { Control, Controller, RegisterOptions } from 'react-hook-form'

type Props = {
  name: string
  error?: boolean
  required?: boolean
  variant?: 'standard' | 'filled' | 'outlined'
  label: React.ReactNode
  children: React.ReactNode
  control: Control
  defaultValue: string
  rules: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  helperText?: React.ReactNode
}

export default function Select(props: Props) {
  const labelId = `${props.name}-select-label`

  return (
    <FormControl
      error={props.error}
      required={props.required}
      variant={props.variant}
    >
      <InputLabel id={labelId}>
        {props.label}
      </InputLabel>
          
      <Controller
        as={
          <MuiSelect
            label={props.label}
            labelId={labelId}
          >
            {props.children}
          </MuiSelect>
        }
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.name}
        rules={props.rules}
      />

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  )
}
