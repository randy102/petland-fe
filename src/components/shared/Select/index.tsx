import {
  FormControl,
  FormControlClassKey,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  StyledComponentProps,
} from '@material-ui/core'
import { SelectInputProps } from '@material-ui/core/Select/SelectInput'
import clsx from 'clsx'
import { Control, Controller, UseControllerProps } from 'react-hook-form'

type Option = {
  value: string
  label: string
}

type Props = {
  name: string
  error?: boolean
  required?: boolean
  variant?: 'standard' | 'filled' | 'outlined'
  label: React.ReactNode
  control: Control
  defaultValue: string
  rules?: UseControllerProps['rules']
  helperText?: React.ReactNode
  disabled?: boolean
  classes?: StyledComponentProps<FormControlClassKey>['classes']
  fullWidth?: boolean
  options?: Option[]
  onChange?: SelectInputProps['onChange']
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
      <InputLabel id={labelId}>{props.label}</InputLabel>

      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.name}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <MuiSelect
            inputRef={ref}
            label={clsx(props.label, props.required && '*')}
            labelId={labelId}
            name={name}
            value={value}
            onBlur={onBlur}
            onChange={(event, child) => {
              props.onChange?.(event, child)
              onChange(event)
            }}
          >
            {props.options?.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </MuiSelect>
        )}
        rules={props.rules}
      />

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  )
}
