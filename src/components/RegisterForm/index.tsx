import { Button, TextField } from '@material-ui/core';
import TextLink from '../TextLink';
import useStyles from './styles';

type Props = {
  onLoginClick: () => void;
};

export default function RegisterForm(props: Props) {
  const classes = useStyles();

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
        <TextLink onClick={props.onLoginClick}>Đăng nhập ngay</TextLink>
      </div>
    </form>
  );
}
