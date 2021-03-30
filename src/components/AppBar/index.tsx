import {
  AppBar as MuiAppBar,
  Button,
  Hidden,
  Toolbar,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import logo from 'src/assets/images/logo.png'
import { useAppDispatch } from 'src/redux/hooks'
import { openModal } from 'src/redux/slices/modal'
import SearchBar from '../SearchBar'
import useStyles from './styles'

export default function AppBar() {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const handleLoginClick = () => dispatch(openModal('LOGIN'))

  const handleRegisterClick = () => dispatch(openModal('REGISTER'))

  return (
    <MuiAppBar position="sticky">
      <Toolbar>
        <IconButton
          aria-label="menu"
          className={classes.menuButton}
          color="inherit"
          edge="start"
        >
          <MenuIcon />
        </IconButton>

        <Hidden xsDown>
          <img
            alt="Petland Logo"
            className={classes.logo}
            src={logo}
          />
        </Hidden>

        <SearchBar />

        <Button
          classes={{ root: classes.loginButtonRoot }}
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleLoginClick}
        >
          Đăng nhập
        </Button>

        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleRegisterClick}
        >
          Đăng ký
        </Button>
      </Toolbar>
    </MuiAppBar>
  )
}
