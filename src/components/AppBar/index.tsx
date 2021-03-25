import { AppBar as MuiAppBar, Button, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import logo from 'src/assets/images/logo.png';
import LoginRegisterModal from '../LoginRegisterModal';
import useStyles from './styles';

export default function AppBar() {
  const classes = useStyles();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleModalClose = () => setModalIsOpen(false);

  const handleLoginClick = () => setModalIsOpen(true);

  const handleRegisterClick = () => setModalIsOpen(true);

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>

        <img src={logo} alt="Petland Logo" className={classes.logo} />

        <Button
          classes={{ root: classes.loginButtonRoot }}
          variant="contained"
          color="secondary"
          onClick={handleLoginClick}
        >
          Đăng nhập
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleRegisterClick}
        >
          Đăng ký
        </Button>

        <LoginRegisterModal open={modalIsOpen} onClose={handleModalClose} />
      </Toolbar>
    </MuiAppBar>
  );
}
