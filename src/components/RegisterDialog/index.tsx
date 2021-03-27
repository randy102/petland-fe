import { Button, TextField } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { openModal, closeModal } from 'src/redux/slices/modal'
import Dialog from '../Dialog'
import TextLink from '../TextLink'
import useStyles from './styles'

export default function RegisterDialog() {
  const classes = useStyles()

  const { open } = useAppSelector(state => state.modal)

  const dispatch = useAppDispatch()

  const handleClose = () => dispatch(closeModal())

  const handleLinkClick = () => dispatch(openModal('LOGIN'))

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open === 'REGISTER'}
      title="Đăng ký"
      onClose={handleClose}
    >
      <form className={classes.root}>
        <TextField fullWidth label="Họ tên" variant="filled" />

        <TextField fullWidth label="Email" variant="filled" />

        <TextField fullWidth label="Số điện thoại" variant="filled" />

        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          variant="filled"
        />

        <Button color="primary" variant="contained">
          Đăng ký
        </Button>

        <div>
          Đã có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng nhập ngay</TextLink>
        </div>
      </form>
    </Dialog>
  )
}
