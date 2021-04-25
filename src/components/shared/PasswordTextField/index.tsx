import {
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = UseFormRegisterReturn & {
  label: string
  fullWidth?: boolean
  required?: boolean
  error?: boolean
  helperText?: string
}

export default function PasswordTextField(props: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClick = () => {
    setShowPassword(showPassword => !showPassword)
  }

  return (
    <FormControl
      error={props.error}
      fullWidth={props.fullWidth}
      required={props.required}
    >
      <InputLabel>{props.label}</InputLabel>

      <OutlinedInput
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleClick}>
              <Icon>{showPassword ? 'visibility' : 'visibility_off'}</Icon>
            </IconButton>
          </InputAdornment>
        }
        inputRef={props.ref}
        label={props.label}
        name={props.name}
        type={showPassword ? 'text' : 'password'}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  )
}
