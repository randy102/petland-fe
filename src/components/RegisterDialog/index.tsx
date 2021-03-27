import { Button, TextField } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { openModal, closeModal } from 'src/redux/slices/modal';
import Dialog from '../Dialog';
import TextLink from '../TextLink';
import useStyles from './styles';

export default function RegisterDialog() {
  const classes = useStyles();

  const { open } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal());

  const handleLinkClick = () => dispatch(openModal('LOGIN'));

  return (
    <Dialog
      open={open === 'REGISTER'}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      title="Đăng ký"
    >
      <form className={classes.root}>
        <TextField fullWidth variant="filled" label="Họ tên" />

        <TextField fullWidth variant="filled" label="Email" />

        <TextField fullWidth variant="filled" label="Số điện thoại" />

        <TextField
          type="password"
          fullWidth
          variant="filled"
          label="Mật khẩu"
        />

        <Button variant="contained" color="primary">
          Đăng ký
        </Button>

        <div>
          Đã có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng nhập ngay</TextLink>
        </div>
      </form>
    </Dialog>
  );
}
