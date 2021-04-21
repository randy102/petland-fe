import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@material-ui/core'
import DialogContent from './DialogContent'
import DialogTitle from './DialogTitle'

export type DialogProps = MuiDialogProps & {
  onClose?: () => void
}

export default function Dialog(props: DialogProps) {
  const { title, scroll = 'body', ...rest } = props

  return (
    <MuiDialog
      scroll={scroll}
      {...rest}
    >
      {title && <DialogTitle onClose={props.onClose}>{title}</DialogTitle>}

      <DialogContent>{props.children}</DialogContent>
    </MuiDialog>
  )
}
