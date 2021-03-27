import { AppBar as MuiAppBar, Button, Hidden, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from 'src/assets/images/logo.png';
import { useAppDispatch } from 'src/redux/hooks';
import { open } from 'src/redux/slices/loginAndRegisterModal';
import useStyles from './styles';

export default function AppBar() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleLoginClick = () => dispatch(open('LOGIN'));

  const handleRegisterClick = () => dispatch(open('REGISTER'));

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

        <Hidden xsDown>
          <img src={logo} alt="Petland Logo" className={classes.logo} />
        </Hidden>

        <Button
          classes={{ root: classes.loginButtonRoot }}
          variant="contained"
          color="secondary"
          onClick={handleLoginClick}
          size="small"
        >
          Đăng nhập
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleRegisterClick}
          size="small"
        >
          Đăng ký
        </Button>
      </Toolbar>
    </MuiAppBar>
  );
}
