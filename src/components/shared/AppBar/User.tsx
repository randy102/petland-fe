import React from 'react'
import { Box, Icon, Typography } from '@material-ui/core'
import {
  bindHover,
  bindMenu,
  usePopupState,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { logout } from 'src/redux/slices/user'
import theme from 'src/theme'
import Avatar from '../Avatar'
import MenuLink from './MenuLink'
import useStyles from './styles'
import { openModal } from 'src/redux/slices/modal'

export default function User() {
  const user = useAppSelector(state => state.user)

  const classes = useStyles()

  const dispatch = useAppDispatch()

  const history = useHistory()

  const popupState = usePopupState({ popupId: 'userMenu', variant: 'popover' })

  const handleLoginClick = () => dispatch(openModal('LOGIN'))

  const handleRegisterClick = () => dispatch(openModal('REGISTER'))

  function handleLogout() {
    dispatch(logout())
    history.push('/')
    popupState.close()
  }

  return (
    <div className={classes.avatarContainer} {...bindHover(popupState)}>
      <Avatar size={48} />

      {user ? (
        <HoverMenu
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: theme.spacing(-0.5),
          }}
          {...bindMenu(popupState)}
        >
          <Box px={2} py={1} width="100%">
            <Typography>{user?.name}</Typography>
          </Box>

          <MenuLink
            Icon={<Icon className="fas fa-plus fa-fw" fontSize="small" />}
            text="Đăng bài"
            to="/my-post/create"
            onClick={popupState.close}
          />

          <MenuLink
            Icon={<Icon className="fas fa-paw fa-fw" fontSize="small" />}
            text="Bài đăng của bạn"
            to="/my-account/posts"
            onClick={popupState.close}
          />

          <MenuLink
            Icon={
              <Icon className="fas fa-user-circle fa-fw" fontSize="small" />
            }
            text="Thông tin cá nhân"
            to="/my-account/profile"
            onClick={popupState.close}
          />

          <MenuLink
            Icon={<Icon className="fas fa-sign-out fa-fw" fontSize="small" />}
            text="Đăng xuất"
            to="#"
            onClick={handleLogout}
          />
        </HoverMenu>
      ) : (
        <HoverMenu
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: theme.spacing(-0.5),
          }}
          {...bindMenu(popupState)}
        >
          <MenuLink
            Icon={<Icon className="fas fa-sign-in fa-fw" fontSize="small" />}
            text="Đăng nhập"
            to="#"
            onClick={handleLoginClick}
          />

          <MenuLink
            Icon={<Icon className="fas fa-edit fa-fw" fontSize="small" />}
            text="Đăng ký"
            to="#"
            onClick={handleRegisterClick}
          />
        </HoverMenu>
      )}
    </div>
  )
}
