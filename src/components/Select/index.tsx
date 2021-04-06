import { FormControl, FormControlClassKey, FormHelperText, InputLabel, Select as MuiSelect, StyledComponentProps } from '@material-ui/core'
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
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  helperText?: React.ReactNode
  disabled?: boolean
  classes?: StyledComponentProps<FormControlClassKey>['classes']
  fullWidth?: boolean
}

export default function Select(props: Props) {
  const labelId = `${props.name}-select-label`

  return (
    <FormControl
      classes={props.classes}
      disabled={props.disabled}
      error={props.error}
      fullWidth={props.fullWidth}
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
