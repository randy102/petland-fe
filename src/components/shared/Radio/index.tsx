import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup,
} from '@material-ui/core'
import { forwardRef } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import useStyles from './styles'

type Item = {
  label: string
  value: string
}

type Props = UseFormRegisterReturn & {
  required?: boolean
  error?: boolean
  label: string
  helperText?: string
  defaultValue?: string
  items: Item[]
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top'
  row?: boolean
  color?: 'primary' | 'secondary'
  fullWidth?: boolean
}

const Radio = forwardRef((props: Props, ref) => {
  const classes = useStyles({
    color: props.color,
  })

  return (
    <FormControl
      component="fieldset"
      error={props.error}
      fullWidth={props.fullWidth}
      required={props.required}
    >
      <FormLabel color={props.color} component="legend">
        {props.label}
      </FormLabel>

      <RadioGroup
        defaultValue={props.defaultValue}
        name={props.name}
        row={props.row}
      >
        {props.items.map(item => (
          <FormControlLabel
            control={
              <MuiRadio
                classes={{
                  checked: classes.checked,
                }}
                inputRef={ref}
                name={props.name}
                onBlur={props.onBlur}
                onChange={props.onChange}
              />
            }
            key={item.value}
            label={item.label}
            labelPlacement={props.labelPlacement}
            value={item.value}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  )
})

Radio.displayName = 'Radio'

export default Radio
