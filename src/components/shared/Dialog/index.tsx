import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@material-ui/core'
import LoadingBackdrop from '../LoadingBackdrop'
import DialogContent from './DialogContent'
import DialogTitle from './DialogTitle'

export type DialogProps = MuiDialogProps & {
  onClose?: () => void
  loading?: boolean
}

export default function Dialog(props: DialogProps) {
  const { title, scroll = 'body', ...rest } = props

  return (
    <MuiDialog disableEscapeKeyDown={!!props.loading} scroll={scroll} {...rest}>
      <LoadingBackdrop open={!!props.loading} />

      {title && <DialogTitle onClose={props.onClose}>{title}</DialogTitle>}

      <DialogContent>{props.children}</DialogContent>
    </MuiDialog>
  )
}
