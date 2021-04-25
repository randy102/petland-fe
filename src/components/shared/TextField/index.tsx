import { TextFieldProps, TextField as MuiTextField } from '@material-ui/core'

export default function TextField(props: TextFieldProps) {
  const { ref, ...rest } = props

  return <MuiTextField inputRef={ref} {...rest} />
}
