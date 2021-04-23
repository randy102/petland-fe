import { Box, Typography } from '@material-ui/core'
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

export default function User() {
  const user = useAppSelector(state => state.user)

  const classes = useStyles()

  const dispatch = useAppDispatch()

  const history = useHistory()

  const popupState = usePopupState({ popupId: 'userMenu', variant: 'popover' })

  function handleLogout() {
    dispatch(logout())
    history.push('/')
    popupState.close()
  }

  return (
    <div className={classes.avatarContainer} {...bindHover(popupState)}>
      <Avatar size={48} />

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
          icon="post_add"
          text="Đăng tin"
          to="/create-post"
          onClick={popupState.close}
        />

        <MenuLink
          icon="pets"
          text="Tin đăng của bạn"
          to="/my-account/posts"
          onClick={popupState.close}
        />

        <MenuLink
          icon="account_circle"
          text="Thông tin cá nhân"
          to="/my-account/profile"
          onClick={popupState.close}
        />

        <MenuLink
          icon="power_settings_new"
          text="Đăng xuất"
          to="#"
          onClick={handleLogout}
        />
      </HoverMenu>
    </div>
  )
}
