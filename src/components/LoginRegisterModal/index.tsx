import { Tab, Tabs } from '@material-ui/core';
import { useState } from 'react';
import Dialog, { DialogProps } from '../Dialog';
import CloseButton from '../Dialog/CloseButton';
import DialogTitle from '../Dialog/DialogTitle';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import useStyles from './styles';

type Props = DialogProps;

export default function LoginRegisterModal(props: Props) {
  const classes = useStyles();

  const [tab, setTab] = useState<number>(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };

  const handleRegisterClick = () => {
    setTab(1);
  };

  const handleLoginClick = () => {
    setTab(0);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <Tabs
        classes={{
          root: classes.tabsRoot,
        }}
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Đăng nhập" />
        <Tab label="Đăng ký" />
      </Tabs>

      <CloseButton onClick={props.onClose} />

      <div hidden={tab !== 0}>
        <LoginForm onRegisterClick={handleRegisterClick} />
      </div>

      <div hidden={tab !== 1}>
        <RegisterForm onLoginClick={handleLoginClick} />
      </div>
    </Dialog>
  );
}
