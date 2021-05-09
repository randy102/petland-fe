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
import SearchBar from '../SearchBar'
import useStyles from './styles'
import User from './User'
import Notification from '../Notification'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import {
  increaseLoadingCount,
  decreaseLoadingCount,
} from 'src/redux/slices/loadingCount'

export default function AppBar() {
  const classes = useStyles()

  const user = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  const { fetch: getUser } = useUser({
    onCompleted: () => {
      dispatch(decreaseLoadingCount())
    },
  })

  useEffect(() => {
    if (!localStorage.getItem('token')) return

    dispatch(increaseLoadingCount())
    getUser()
  }, [])

  return (
    <MuiAppBar position="sticky">
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

          {user && <Notification />}

          <User />
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}
