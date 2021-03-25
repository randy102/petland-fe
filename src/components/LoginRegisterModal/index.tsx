import { Tab, Tabs } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Dialog from '../Dialog';
import CloseButton from '../Dialog/CloseButton';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import useStyles from './styles';
import {
  close,
  changeTab,
  RegisterLoginModalTab,
} from 'src/redux/slices/registerLoginModal';

export default function LoginRegisterModal() {
  const classes = useStyles();

  const { open, tab } = useAppSelector(state => state.registerLoginModal);

  const dispatch = useAppDispatch();

  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTab: RegisterLoginModalTab
  ) => {
    dispatch(changeTab(newTab));
  };

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Tabs
        classes={{
          root: classes.tabsRoot,
        }}
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Đăng nhập" value="LOGIN" />
        <Tab label="Đăng ký" value="REGISTER" />
      </Tabs>

      <CloseButton onClick={handleClose} />

      <div hidden={tab !== 'LOGIN'}>
        <LoginForm />
      </div>

      <div hidden={tab !== 'REGISTER'}>
        <RegisterForm />
      </div>
    </Dialog>
  );
}
