import { Button, TextField } from '@material-ui/core';
import { useAppDispatch } from 'src/redux/hooks';
import { changeTab } from 'src/redux/slices/registerLoginModal';
import TextLink from '../TextLink';
import useStyles from './styles';

export default function LoginForm() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleClick = () => dispatch(changeTab('REGISTER'));

  return (
    <form className={classes.root}>
      <TextField fullWidth variant="filled" label="Email" />

      <TextField type="password" fullWidth variant="filled" label="Mật khẩu" />

      <Button variant="contained" color="primary">
        Đăng nhập
      </Button>

      <div>
        Chưa có tài khoản?{' '}
        <TextLink onClick={handleClick}>Đăng ký ngay</TextLink>
      </div>
    </form>
  );
}
