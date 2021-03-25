import { Button, TextField } from '@material-ui/core';
import { useAppDispatch } from 'src/redux/hooks';
import { changeTab } from 'src/redux/slices/loginAndRegisterModal';
import TextLink from '../TextLink';
import useStyles from './styles';

export default function RegisterForm() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(changeTab('LOGIN'));

  return (
    <form className={classes.root}>
      <TextField fullWidth variant="filled" label="Họ tên" />

      <TextField fullWidth variant="filled" label="Email" />

      <TextField fullWidth variant="filled" label="Số điện thoại" />

      <TextField type="password" fullWidth variant="filled" label="Mật khẩu" />

      <Button variant="contained" color="primary">
        Đăng ký
      </Button>

      <div>
        Đã có tài khoản?{' '}
        <TextLink onClick={handleClick}>Đăng nhập ngay</TextLink>
      </div>
    </form>
  );
}
