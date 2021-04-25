import { TextFieldProps, TextField as MuiTextField } from '@material-ui/core'
import { forwardRef } from 'react'

const TextField = forwardRef((props: TextFieldProps, ref) => {
  const { ...rest } = props

  return <MuiTextField inputRef={ref} {...rest} />
})

TextField.displayName = 'TextField'

export default TextField
