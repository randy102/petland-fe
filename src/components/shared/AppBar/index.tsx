import {
  AppBar as MuiAppBar,
  Button,
  Container,
  Hidden,
  Toolbar,
} from '@material-ui/core'
import React from 'react'
import IconButton from '@material-ui/core/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useEffect } from 'react'
import logo from 'src/assets/images/logo.png'
import useUser from 'src/hooks/useUser'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { openModal } from 'src/redux/slices/modal'
import LoadingBackdrop from '../LoadingBackdrop'
import SearchBar from '../SearchBar'
import useStyles from './styles'
import User from './User'
import { Link } from 'react-router-dom'

export default function AppBar() {
  const classes = useStyles()

  const dispatch = useAppDispatch()

  const handleLoginClick = () => dispatch(openModal('LOGIN'))

  const handleRegisterClick = () => dispatch(openModal('REGISTER'))

  const { fetch: getUser, loading: gettingUser } = useUser()

  const user = useAppSelector(state => state.user)

  useEffect(() => {
    if (!localStorage.getItem('token')) return

    if (user !== null) return

    getUser?.()
  }, [getUser, user])

  return (
    <MuiAppBar position="sticky">
      <LoadingBackdrop open={gettingUser} />

      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label="menu"
            className={classes.menuButton}
            color="inherit"
            edge="start"
          >
            <MenuIcon />
          </IconButton>

          <Hidden xsDown>
            <Link to="/">
              <img alt="Petland Logo" className={classes.logo} src={logo} />
            </Link>
          </Hidden>

          <SearchBar />

          {localStorage.getItem('token') ? (
            <User />
          ) : (
            <React.Fragment>
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
            </React.Fragment>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
