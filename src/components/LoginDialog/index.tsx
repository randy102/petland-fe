import { Button, TextField } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { closeModal, openModal } from 'src/redux/slices/modal';
import Dialog from '../Dialog';
import TextLink from '../TextLink';
import useStyles from './styles';

export default function LoginDialog() {
  const classes = useStyles();

  const { open } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeModal());

  const handleLinkClick = () => dispatch(openModal('REGISTER'));

  return (
    <Dialog
      open={open === 'LOGIN'}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      title="Đăng nhập"
    >
      <form className={classes.root}>
        <TextField fullWidth variant="filled" label="Email" />

        <TextField
          type="password"
          fullWidth
          variant="filled"
          label="Mật khẩu"
        />

        <Button variant="contained" color="primary">
          Đăng nhập
        </Button>

        <div>
          Chưa có tài khoản?{' '}
          <TextLink onClick={handleLinkClick}>Đăng ký ngay</TextLink>
        </div>
      </form>
    </Dialog>
  );
}
