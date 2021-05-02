import {
  AppBar as MuiAppBar,
  Container,
  Hidden,
  Toolbar,
} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from 'src/assets/images/logo.png'
import useUser from 'src/hooks/useUser'
import LoadingBackdrop from '../LoadingBackdrop'
import SearchBar from '../SearchBar'
import useStyles from './styles'
import User from './User'

export default function AppBar() {
  const classes = useStyles()

  const { fetch: getUser, loading: gettingUser } = useUser()

  useEffect(() => {
    if (!localStorage.getItem('token')) return

    getUser()
  }, [])

  return (
    <MuiAppBar position="sticky">
      <LoadingBackdrop open={gettingUser} />

      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Hidden smUp>
            <IconButton color="inherit" edge="start">
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Hidden xsDown>
            <Link className={classes.logoLink} to="/">
              <img alt="Petland Logo" className={classes.logo} src={logo} />
            </Link>
          </Hidden>

          <SearchBar />

          <User />
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
