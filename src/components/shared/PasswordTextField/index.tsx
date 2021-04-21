import { FormControl, FormHelperText, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@material-ui/core'
import { useState } from 'react'

type Props = {
  label: string
  name: string
  inputRef: any
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
            <IconButton
              edge="end"
              onClick={handleClick}
            >
              <Icon>{showPassword ? 'visibility' : 'visibility_off'}</Icon>
            </IconButton>
          </InputAdornment>
        }
        inputRef={props.inputRef}
        label={props.label}
        name={props.name}
        type={showPassword ? 'text' : 'password'}
      />

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  )
}
