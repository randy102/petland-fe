import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
} from '@material-ui/core'
import { Help } from '@material-ui/icons'
import useStyles from './styles'

type Props = {
  title?: string
  content?: string
  open: boolean
  onOk?: () => void
  onCancel?: () => void
  okButtonText?: string
  cancelButtonText?: string
  okButtonProps?: Omit<ButtonProps, 'onClick'>
  cancelButtonProps?: Omit<ButtonProps, 'onClick'>
}

export default function ConfirmDialog(props: Props) {
  const {
    open,
    okButtonText,
    cancelButtonText,
    okButtonProps,
    cancelButtonProps,
    title,
    content,
    onCancel,
    onOk,
  } = props

  const classes = useStyles()

  return (
    <Dialog open={open}>
      <DialogTitle className={classes.title}>
        <Help className={classes.titleIcon} />
        {title || 'Bạn có chắc không?'}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={onCancel} {...cancelButtonProps}>
          {cancelButtonText || 'Không'}
        </Button>

        <Button color="secondary" onClick={onOk} {...okButtonProps}>
          {okButtonText || 'Có'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
