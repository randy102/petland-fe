import { Button, TextField } from '@material-ui/core';
import TextLink from '../TextLink';
import useStyles from './styles';

type Props = {
  onRegisterClick: () => void;
};

export default function LoginForm(props: Props) {
  const classes = useStyles();

  return (
    <form className={classes.root}>
      <TextField fullWidth variant="filled" label="Email" />

      <TextField type="password" fullWidth variant="filled" label="Mật khẩu" />

      <Button variant="contained" color="primary">
        Đăng nhập
      </Button>

      <div>
        Chưa có tài khoản?{' '}
        <TextLink onClick={props.onRegisterClick}>Đăng ký ngay</TextLink>
      </div>
    </form>
  );
}
